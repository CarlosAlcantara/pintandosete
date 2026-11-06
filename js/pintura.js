/* Motor de pintura: balde (preenchimento por região), pincel mágico (não sai das linhas),
   lápis livre, borracha, desfazer. Pensado para aparelhos de pouca potência. */
(function () {
  'use strict';

  var memBaixa = (navigator.deviceMemory && navigator.deviceMemory <= 2) || false;

  function Pintura(cvTinta, cvLinhas) {
    this.cvT = cvTinta;
    this.cvL = cvLinhas;
    this.ctxT = cvTinta.getContext('2d');
    this.ctxL = cvLinhas.getContext('2d');
    this.S = 0;
    this.ferramenta = 'balde';
    this.cor = '#e63946';
    this.tamanho = 1;
    this.desfazer = [];
    this.maxDesfazer = memBaixa ? 5 : 10;
    this.alterado = false;
    this.onMudou = null;
    this.onPintou = null;
    this._ponteiro = null;
    this._hue = 0;
    this._ligar();
  }

  // tamanho interno do quadro conforme a tela e a memória do aparelho
  Pintura.prototype.tamanhoIdeal = function (ladoCss) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var max = memBaixa ? 800 : 1100;
    return Math.max(500, Math.min(max, Math.round(ladoCss * dpr)));
  };

  // carrega uma figura (string SVG) e, opcionalmente, uma pintura salva (Blob)
  Pintura.prototype.carregar = function (svg, ladoCss, tintaBlob) {
    var self = this, S = this.tamanhoIdeal(ladoCss);
    this.S = S;
    this.cvT.width = this.cvT.height = S;
    this.cvL.width = this.cvL.height = S;
    this.desfazer = [];
    this.alterado = false;
    this.regiao = new Uint8Array(S * S);
    if (!this.cvMasc) { this.cvMasc = document.createElement('canvas'); this.cvTmp = document.createElement('canvas'); }
    this.cvMasc.width = this.cvMasc.height = S;
    this.cvTmp.width = this.cvTmp.height = S;
    this.ctxM = this.cvMasc.getContext('2d');
    this.ctxTmp = this.cvTmp.getContext('2d');

    return new Promise(function (ok, erro) {
      var img = new Image();
      img.onload = function () {
        var off = document.createElement('canvas');
        off.width = off.height = S;
        var o = off.getContext('2d');
        o.fillStyle = '#fff';
        o.fillRect(0, 0, S, S);
        o.drawImage(img, 0, 0, S, S);
        var d = o.getImageData(0, 0, S, S), px = d.data, N = S * S;
        var parede = new Uint8Array(N);
        for (var i = 0, j = 0; i < N; i++, j += 4) {
          var lum = px[j] * 0.3 + px[j + 1] * 0.59 + px[j + 2] * 0.11;
          var esc = 255 - lum;
          px[j] = px[j + 1] = px[j + 2] = 25;
          px[j + 3] = esc;
          if (esc > 110) parede[i] = 1;
        }
        self.parede = parede;
        self.ctxL.putImageData(d, 0, 0);
        self.ctxT.clearRect(0, 0, S, S);
        if (tintaBlob) {
          var url = URL.createObjectURL(tintaBlob), im2 = new Image();
          im2.onload = function () { self.ctxT.drawImage(im2, 0, 0, S, S); URL.revokeObjectURL(url); ok(); };
          im2.onerror = function () { URL.revokeObjectURL(url); ok(); };
          im2.src = url;
        } else ok();
      };
      img.onerror = erro;
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });
  };

  // ---------- região conectada (preenchimento por linhas de varredura) ----------
  Pintura.prototype._acharLivre = function (x, y) {
    var S = this.S, p = this.parede;
    if (!p[y * S + x]) return [x, y];
    for (var r = 1; r <= 8; r++) {
      for (var dy = -r; dy <= r; dy++) for (var dx = -r; dx <= r; dx++) {
        var xx = x + dx, yy = y + dy;
        if (xx >= 0 && yy >= 0 && xx < S && yy < S && !p[yy * S + xx]) return [xx, yy];
      }
    }
    return null;
  };

  Pintura.prototype.regiaoDe = function (x0, y0) {
    var S = this.S, p = this.parede, reg = this.regiao;
    var ini = this._acharLivre(x0, y0);
    if (!ini) return null;
    reg.fill(0);
    var minX = S, minY = S, maxX = 0, maxY = 0, total = 0;
    var pilha = [ini[0], ini[1]];
    while (pilha.length) {
      var y = pilha.pop(), x = pilha.pop(), i = y * S + x;
      if (reg[i] || p[i]) continue;
      var xl = x, xr = x;
      while (xl > 0 && !p[i - (x - xl) - 1] && !reg[i - (x - xl) - 1]) xl--;
      while (xr < S - 1 && !p[i + (xr - x) + 1] && !reg[i + (xr - x) + 1]) xr++;
      var base = y * S;
      for (var k = xl; k <= xr; k++) reg[base + k] = 1;
      total += xr - xl + 1;
      if (xl < minX) minX = xl; if (xr > maxX) maxX = xr; if (y < minY) minY = y; if (y > maxY) maxY = y;
      var cima = y > 0, baixo = y < S - 1, antC = false, antB = false;
      for (var k2 = xl; k2 <= xr; k2++) {
        if (cima) {
          var ic = base - S + k2, livreC = !p[ic] && !reg[ic];
          if (livreC && !antC) pilha.push(k2, y - 1);
          antC = livreC;
        }
        if (baixo) {
          var ib = base + S + k2, livreB = !p[ib] && !reg[ib];
          if (livreB && !antB) pilha.push(k2, y + 1);
          antB = livreB;
        }
      }
    }
    // avança 2px por baixo das linhas para não deixar "fiapos" brancos
    var bx0 = Math.max(0, minX - 3), by0 = Math.max(0, minY - 3), bx1 = Math.min(S - 1, maxX + 3), by1 = Math.min(S - 1, maxY + 3);
    for (var passo = 0; passo < 2; passo++) {
      var marca = passo + 2;
      for (var yy = by0; yy <= by1; yy++) {
        for (var xx = bx0; xx <= bx1; xx++) {
          var q = yy * S + xx;
          if (reg[q] || !p[q]) continue;
          if ((xx > 0 && reg[q - 1] && reg[q - 1] < marca) || (xx < S - 1 && reg[q + 1] && reg[q + 1] < marca) ||
            (yy > 0 && reg[q - S] && reg[q - S] < marca) || (yy < S - 1 && reg[q + S] && reg[q + S] < marca)) reg[q] = marca;
        }
      }
    }
    return { x: bx0, y: by0, w: bx1 - bx0 + 1, h: by1 - by0 + 1, total: total };
  };

  function hex(c) { return [parseInt(c.substr(1, 2), 16), parseInt(c.substr(3, 2), 16), parseInt(c.substr(5, 2), 16)]; }
  function hsl(h) {
    var s = 0.85, l = 0.55, k = function (n) { return (n + h / 30) % 12; }, a = s * Math.min(l, 1 - l);
    var f = function (n) { return Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))); };
    return [f(0), f(8), f(4)];
  }

  // ---------- ações ----------
  Pintura.prototype._guardar = function () {
    try {
      this.desfazer.push(this.ctxT.getImageData(0, 0, this.S, this.S));
      if (this.desfazer.length > this.maxDesfazer) this.desfazer.shift();
    } catch (e) { this.desfazer = []; }
  };
  Pintura.prototype.voltar = function () {
    var d = this.desfazer.pop();
    if (d) { this.ctxT.putImageData(d, 0, 0); this.alterado = true; if (this.onMudou) this.onMudou(); return true; }
    return false;
  };
  Pintura.prototype.limpar = function () {
    this._guardar();
    this.ctxT.clearRect(0, 0, this.S, this.S);
    this.alterado = true;
    if (this.onMudou) this.onMudou();
  };

  Pintura.prototype.encher = function (x, y) {
    var b = this.regiaoDe(x, y);
    if (!b) return false;
    this._guardar();
    var S = this.S, reg = this.regiao, img = this.ctxT.getImageData(b.x, b.y, b.w, b.h), px = img.data;
    var arco = this.cor === 'arco', rgb = arco ? null : hex(this.cor);
    for (var yy = 0; yy < b.h; yy++) {
      var lin = (b.y + yy) * S + b.x;
      for (var xx = 0; xx < b.w; xx++) {
        if (!reg[lin + xx]) continue;
        var j = (yy * b.w + xx) * 4, c = rgb || hsl((xx / b.w) * 300);
        px[j] = c[0]; px[j + 1] = c[1]; px[j + 2] = c[2]; px[j + 3] = 255;
      }
    }
    this.ctxT.putImageData(img, b.x, b.y);
    this.alterado = true;
    if (this.onPintou) this.onPintou('balde');
    if (this.onMudou) this.onMudou();
    return true;
  };

  Pintura.prototype._prepararMascara = function (x, y) {
    var b = this.regiaoDe(x, y);
    if (!b) return false;
    var S = this.S, reg = this.regiao, m = this.ctxM;
    m.clearRect(0, 0, S, S);
    var img = m.createImageData(b.w, b.h), px = img.data;
    for (var yy = 0; yy < b.h; yy++) {
      var lin = (b.y + yy) * S + b.x;
      for (var xx = 0; xx < b.w; xx++) if (reg[lin + xx]) px[(yy * b.w + xx) * 4 + 3] = 255;
    }
    m.putImageData(img, b.x, b.y);
    this._masc = b;
    return true;
  };

  Pintura.prototype.raio = function () { return [0.012, 0.028, 0.055][this.tamanho] * this.S; };

  Pintura.prototype._corTraco = function () {
    if (this.cor !== 'arco') return this.cor;
    this._hue = (this._hue + 6) % 360;
    return 'hsl(' + this._hue + ',85%,55%)';
  };

  Pintura.prototype._segmento = function (x0, y0, x1, y1) {
    var r = this.raio(), ctx;
    var desenhar = function (c, cor) {
      c.lineCap = c.lineJoin = 'round';
      c.lineWidth = r * 2;
      c.strokeStyle = cor;
      c.fillStyle = cor;
      c.beginPath();
      if (x0 === x1 && y0 === y1) { c.arc(x0, y0, r, 0, Math.PI * 2); c.fill(); }
      else { c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); }
    };
    if (this.ferramenta === 'borracha') {
      ctx = this.ctxT;
      ctx.save(); ctx.globalCompositeOperation = 'destination-out'; desenhar(ctx, '#000'); ctx.restore();
    } else if (this.ferramenta === 'lapis' || !this._masc) {
      desenhar(this.ctxT, this._corTraco());
    } else {
      // pincel mágico: desenha num rascunho e recorta pela região escolhida
      var bx = Math.max(0, Math.floor(Math.min(x0, x1) - r - 2)), by = Math.max(0, Math.floor(Math.min(y0, y1) - r - 2));
      var bw = Math.min(this.S - bx, Math.ceil(Math.abs(x1 - x0) + 2 * r + 4)), bh = Math.min(this.S - by, Math.ceil(Math.abs(y1 - y0) + 2 * r + 4));
      if (bw <= 0 || bh <= 0) return;
      var t = this.ctxTmp;
      t.clearRect(bx, by, bw, bh);
      desenhar(t, this._corTraco());
      t.globalCompositeOperation = 'destination-in';
      t.drawImage(this.cvMasc, bx, by, bw, bh, bx, by, bw, bh);
      t.globalCompositeOperation = 'source-over';
      this.ctxT.drawImage(this.cvTmp, bx, by, bw, bh, bx, by, bw, bh);
    }
  };

  Pintura.prototype._pos = function (e) {
    var r = this.cvL.getBoundingClientRect();
    return [Math.max(0, Math.min(this.S - 1, Math.round(((e.clientX - r.left) / r.width) * this.S))),
      Math.max(0, Math.min(this.S - 1, Math.round(((e.clientY - r.top) / r.height) * this.S)))];
  };

  Pintura.prototype._ligar = function () {
    var self = this, alvo = this.cvL;
    alvo.addEventListener('pointerdown', function (e) {
      if (self._ponteiro !== null || !self.S) return;
      e.preventDefault();
      var p = self._pos(e);
      if (self.ferramenta === 'balde') { self.encher(p[0], p[1]); return; }
      self._ponteiro = e.pointerId;
      try { alvo.setPointerCapture(e.pointerId); } catch (er) { /* ok */ }
      self._guardar();
      self._masc = null;
      if (self.ferramenta === 'magico') self._prepararMascara(p[0], p[1]);
      self._ult = p;
      self._segmento(p[0], p[1], p[0], p[1]);
      self.alterado = true;
    });
    alvo.addEventListener('pointermove', function (e) {
      if (e.pointerId !== self._ponteiro) return;
      e.preventDefault();
      var evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      if (!evs.length) evs = [e];
      for (var i = 0; i < evs.length; i++) {
        var p = self._pos(evs[i]);
        self._segmento(self._ult[0], self._ult[1], p[0], p[1]);
        self._ult = p;
      }
    });
    var fim = function (e) {
      if (e.pointerId !== self._ponteiro) return;
      self._ponteiro = null;
      self._masc = null;
      if (self.onPintou) self.onPintou(self.ferramenta);
      if (self.onMudou) self.onMudou();
    };
    alvo.addEventListener('pointerup', fim);
    alvo.addEventListener('pointercancel', fim);
    alvo.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  };

  // imagem final (fundo branco + tinta + linhas + assinatura opcional)
  Pintura.prototype.composicao = function (lado, assinatura) {
    var c = document.createElement('canvas');
    c.width = c.height = lado;
    var x = c.getContext('2d');
    x.fillStyle = '#fff';
    x.fillRect(0, 0, lado, lado);
    x.drawImage(this.cvT, 0, 0, lado, lado);
    x.drawImage(this.cvL, 0, 0, lado, lado);
    if (assinatura) assinatura(x, lado);
    return c;
  };

  window.Pintura = Pintura;
})();
