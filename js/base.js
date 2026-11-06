/* Pintando o Sete — biblioteca de desenho (SVG) e catálogo de figuras.
   Todas as figuras usam viewBox 0 0 400 400, contorno preto e áreas brancas. */
(function () {
  'use strict';

  var FIG = (window.FIG = { lista: [], porId: {}, cats: [], W: 5 });

  // Espessura do traço por nível (1 fácil, 2 médio, 3 difícil)
  var TRACO = { 1: 7, 2: 5, 3: 3.6 };

  // ---------- gerador pseudoaleatório determinístico ----------
  FIG.rng = function (seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  // ---------- pilha de escala (para manter o traço uniforme) ----------
  var SC = [1];
  function esc() { return SC[SC.length - 1]; }
  function sw(f) { return +((FIG.W * (f || 1)) / esc()).toFixed(2); }

  function n(v) { return +(+v).toFixed(1); }

  var S = (window.S = {});
  S.sw = sw;
  S.n = n;
  // círculo
  S.c = function (x, y, r, a) { return '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(r) + '"' + (a || '') + '/>'; };
  // elipse (rot opcional em graus)
  S.el = function (x, y, rx, ry, rot, a) {
    return '<ellipse cx="' + n(x) + '" cy="' + n(y) + '" rx="' + n(rx) + '" ry="' + n(ry) + '"' +
      (rot ? ' transform="rotate(' + rot + ' ' + n(x) + ' ' + n(y) + ')"' : '') + (a || '') + '/>';
  };
  // retângulo com cantos arredondados
  S.rc = function (x, y, w, h, r, a) {
    return '<rect x="' + n(x) + '" y="' + n(y) + '" width="' + n(w) + '" height="' + n(h) + '"' + (r ? ' rx="' + n(r) + '"' : '') + (a || '') + '/>';
  };
  // caminho fechado (preenchível)
  S.P = function (d, a) { return '<path d="' + d + '"' + (a || '') + '/>'; };
  // linha/caminho aberto (sem preenchimento)
  S.L = function (d, f) { return '<path d="' + d + '" fill="none"' + (f ? ' stroke-width="' + sw(f) + '"' : '') + '/>'; };
  S.ln = function (x1, y1, x2, y2, f) { return S.L('M' + n(x1) + ' ' + n(y1) + 'L' + n(x2) + ' ' + n(y2), f); };
  // polígono
  S.pg = function (pts, a) {
    var s = '';
    for (var i = 0; i < pts.length; i += 2) s += n(pts[i]) + ',' + n(pts[i + 1]) + ' ';
    return '<polygon points="' + s.trim() + '"' + (a || '') + '/>';
  };
  S.PRETO = ' fill="#000"';
  S.dot = function (x, y, r) { return S.c(x, y, r, S.PRETO); };
  // olho: branco + pupila preta + brilho
  S.eye = function (x, y, r, dx, dy) {
    dx = dx || 0; dy = dy || 0;
    return S.c(x, y, r) + S.c(x + dx, y + dy, r * 0.55, S.PRETO) + S.c(x + dx - r * 0.2, y + dy - r * 0.22, r * 0.18, ' fill="#fff" stroke="none"');
  };
  // sorriso (arco aberto)
  S.smile = function (x, y, w, h) { h = h || w * 0.5; return S.L('M' + n(x - w) + ' ' + n(y) + 'Q' + n(x) + ' ' + n(y + h * 2) + ' ' + n(x + w) + ' ' + n(y)); };
  // estrela
  S.starPts = function (x, y, R, r, k, rot) {
    k = k || 5; rot = rot == null ? -90 : rot;
    var p = [];
    for (var i = 0; i < k * 2; i++) {
      var ang = ((rot + (i * 180) / k) * Math.PI) / 180, rr = i % 2 ? r : R;
      p.push(x + rr * Math.cos(ang), y + rr * Math.sin(ang));
    }
    return p;
  };
  S.star = function (x, y, R, r, k, rot, a) { return S.pg(S.starPts(x, y, R, r, k, rot), a); };
  // polígono regular
  S.reg = function (x, y, R, k, rot, a) {
    rot = rot == null ? -90 : rot;
    var p = [];
    for (var i = 0; i < k; i++) { var ang = ((rot + (i * 360) / k) * Math.PI) / 180; p.push(x + R * Math.cos(ang), y + R * Math.sin(ang)); }
    return S.pg(p, a);
  };
  // coração (centro x, y; tamanho s)
  S.heart = function (x, y, s, a) {
    var k = s / 100;
    function q(px, py) { return n(x + px * k) + ' ' + n(y + py * k); }
    return S.P('M' + q(0, 35) + 'C' + q(-10, 25) + ' ' + q(-60, 0) + ' ' + q(-60, -25) + 'C' + q(-60, -55) + ' ' + q(-20, -60) + ' ' + q(0, -35) +
      'C' + q(20, -60) + ' ' + q(60, -55) + ' ' + q(60, -25) + 'C' + q(60, 0) + ' ' + q(10, 25) + ' ' + q(0, 35) + 'Z', a);
  };
  // nuvem
  S.cloud = function (x, y, s) {
    var k = s / 100;
    function q(px, py) { return n(x + px * k) + ' ' + n(y + py * k); }
    return S.P('M' + q(-70, 25) + 'C' + q(-100, 25) + ' ' + q(-100, -20) + ' ' + q(-65, -15) + 'C' + q(-65, -50) + ' ' + q(-15, -55) + ' ' + q(-5, -30) +
      'C' + q(10, -65) + ' ' + q(70, -55) + ' ' + q(60, -15) + 'C' + q(100, -20) + ' ' + q(100, 25) + ' ' + q(70, 25) + 'Z');
  };
  // flor simples
  S.flor = function (x, y, r, k, a) {
    k = k || 6; var s = '';
    for (var i = 0; i < k; i++) {
      var ang = (i * 360) / k, rad = (ang * Math.PI) / 180;
      s += S.el(x + Math.cos(rad) * r, y + Math.sin(rad) * r, r * 0.75, r * 0.5, ang);
    }
    return s + S.c(x, y, r * 0.6, a);
  };
  // raios de sol (triângulos)
  S.raios = function (x, y, r1, r2, k, w) {
    var s = '';
    for (var i = 0; i < k; i++) {
      var a = (i / k) * Math.PI * 2, b = w / r1;
      s += S.pg([x + Math.cos(a - b) * r1, y + Math.sin(a - b) * r1, x + Math.cos(a) * r2, y + Math.sin(a) * r2, x + Math.cos(a + b) * r1, y + Math.sin(a + b) * r1]);
    }
    return s;
  };
  // transformação com escala (mantém espessura do traço)
  S.T = function (x, y, s, fn, rot) {
    var sa = Math.abs(s);
    SC.push(esc() * sa);
    var inner = typeof fn === 'function' ? fn() : fn;
    SC.pop();
    return '<g transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + s + ')' + (rot ? ' rotate(' + rot + ')' : '') + '" stroke-width="' + +((FIG.W / (esc() * sa)).toFixed(2)) + '">' + inner + '</g>';
  };
  // espelhar horizontalmente em torno de x=200
  S.M = function (fn) { return '<g transform="translate(400 0) scale(-1 1)">' + (typeof fn === 'function' ? fn() : fn) + '</g>'; };
  S.R = function (ang, x, y, inner) { return '<g transform="rotate(' + ang + ' ' + x + ' ' + y + ')">' + inner + '</g>'; };
  S.fino = function (f) { return ' stroke-width="' + sw(f || 0.6) + '"'; };

  // ---------- catálogo ----------
  FIG.cat = function (id, nome, icone) { FIG.cats.push({ id: id, nome: nome, icone: icone }); };
  FIG.add = function (o) {
    if (FIG.porId[o.id]) throw new Error('id repetido: ' + o.id);
    FIG.lista.push(o);
    FIG.porId[o.id] = o;
    return o;
  };

  // Gera o SVG completo de uma figura
  FIG.svg = function (fig) {
    FIG.W = fig.traco || TRACO[fig.nivel] || 5;
    SC = [1];
    var corpo = fig.d();
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">' +
      '<rect width="400" height="400" fill="#fff"/>' +
      '<g fill="#fff" stroke="#000" stroke-width="' + FIG.W + '" stroke-linejoin="round" stroke-linecap="round">' + corpo + '</g></svg>';
  };
  // Desenha só o "miolo" de uma figura (para compor cenas)
  FIG.miolo = function (id) { return FIG.porId[id].d(); };

  // ---------- cenários de fundo ----------
  var C = (FIG.cenario = {});
  var chao = function (y) { return S.P('M-10 ' + y + 'Q100 ' + (y - 18) + ' 200 ' + y + 'T410 ' + y + 'L410 410L-10 410Z'); };
  C.jardim = function () {
    var s = S.c(340, 60, 32) + S.raios(340, 60, 40, 58, 10, 7) + S.cloud(90, 70, 55) + chao(330);
    for (var i = 0; i < 9; i++) s += S.L('M' + (20 + i * 45) + ' 360l6 -18l6 18', 0.8);
    s += S.ln(30, 330, 30, 280) + S.flor(30, 270, 14, 5) + S.ln(375, 330, 375, 285) + S.flor(375, 275, 13, 6);
    return s;
  };
  C.ceu = function () {
    return S.c(60, 60, 30) + S.raios(60, 60, 38, 55, 9, 7) + S.cloud(310, 70, 60) + S.cloud(90, 330, 50) + S.cloud(320, 320, 45) +
      S.L('M140 40q10 -10 20 0q10 -10 20 0', 0.8) + S.L('M230 130q8 -8 16 0q8 -8 16 0', 0.8);
  };
  C.mar = function () {
    var s = S.P('M-10 360Q60 340 130 360T260 355T410 360L410 410L-10 410Z');
    s += S.P('M25 362C5 320 45 300 25 260C15 240 40 230 35 205C55 230 40 245 50 262C70 300 30 320 45 362Z');
    s += S.P('M365 362C385 320 345 300 365 260C375 240 350 230 355 205C335 230 350 245 340 262C320 300 360 320 345 362Z');
    s += S.c(60, 80, 10) + S.c(80, 50, 6) + S.c(340, 100, 12) + S.c(355, 65, 7) + S.c(320, 40, 5);
    s += S.P('M300 395l15 -25l15 25z') + S.c(120, 385, 10);
    return s;
  };
  C.fazenda = function () {
    var s = S.P('M-10 250Q100 170 220 250Q320 190 410 240L410 410L-10 410Z') + S.c(330, 70, 30) + S.raios(330, 70, 38, 55, 9, 7) + S.cloud(100, 70, 50);
    for (var i = 0; i < 6; i++) s += S.rc(i * 70 + 8, 285, 14, 70, 3);
    s += S.rc(-10, 300, 420, 12, 3) + S.rc(-10, 330, 420, 12, 3);
    return s;
  };
  C.espaco = function () {
    var s = S.el(70, 80, 62, 15, -20) + S.c(70, 80, 34) + S.L('M38 72Q70 92 102 74', 0.8);
    s += S.star(330, 60, 22, 9) + S.star(360, 330, 16, 7) + S.star(40, 330, 14, 6) + S.star(210, 30, 10, 4);
    s += S.P('M300 330a40 40 0 1 0 50 -55a32 32 0 1 1 -50 55z');
    s += S.c(130, 220, 4, S.PRETO) + S.c(280, 200, 4, S.PRETO) + S.c(170, 370, 4, S.PRETO);
    return s;
  };
  C.noite = function () {
    var s = S.P('M330 40a45 45 0 1 0 40 70a36 36 0 1 1 -40 -70z') + S.star(80, 60, 18, 7) + S.star(190, 40, 12, 5) + S.star(40, 170, 10, 4) + S.star(370, 190, 12, 5);
    s += S.P('M-10 360Q200 330 410 360L410 410L-10 410Z');
    return s;
  };
  C.cidade = function () {
    var s = S.rc(10, 120, 70, 230) + S.rc(320, 90, 75, 260) + S.rc(80, 180, 60, 170);
    for (var i = 0; i < 4; i++) { s += S.rc(25, 140 + i * 50, 15, 22) + S.rc(50, 140 + i * 50, 15, 22) + S.rc(335, 110 + i * 55, 18, 25) + S.rc(365, 110 + i * 55, 18, 25); }
    s += S.cloud(200, 60, 45) + S.rc(-10, 350, 420, 60) + S.L('M20 380h40M100 380h40M180 380h40M260 380h40M340 380h40');
    return s;
  };
  C.sala = function () {
    var s = S.rc(260, 30, 120, 100, 6) + S.ln(320, 30, 320, 130) + S.ln(260, 80, 380, 80);
    s += S.rc(20, 40, 90, 70, 4) + S.L('M35 95l20 -30l15 18l12 -10l18 22', 0.8) + S.c(90, 58, 7);
    s += S.rc(-10, 330, 420, 22, 4) + S.rc(30, 352, 22, 60) + S.rc(348, 352, 22, 60);
    return s;
  };
  C.mesa = function () {
    var s = S.L('M-10 30Q200 80 410 30'), cores = 0;
    for (var i = 0; i < 9; i++) { var x = 10 + i * 46, y = 30 + Math.sin((x / 400) * Math.PI) * 25; s += S.pg([x - 16, y + 2, x + 16, y + 4, x, y + 34]); }
    s += S.rc(-10, 268, 420, 30, 6) + S.P('M-10 298L410 298L410 328Q385 348 360 328Q335 348 310 328Q285 348 260 328Q235 348 210 328Q185 348 160 328Q135 348 110 328Q85 348 60 328Q35 348 10 328Q0 338 -10 328Z');
    s += S.rc(30, 333, 22, 80) + S.rc(348, 333, 22, 80);
    return s;
  };
  C.parque = function () {
    var s = S.rc(30, 200, 22, 130) + S.c(41, 170, 50) + S.c(10, 200, 30) + S.c(75, 200, 30);
    s += S.c(350, 60, 28) + S.raios(350, 60, 36, 52, 9, 7) + S.cloud(200, 55, 45) + chao(330);
    s += S.L('M330 330l25 -60l25 60M342 300h26', 0.9);
    return s;
  };
  C.floresta = function () {
    var s = '';
    s += S.rc(20, 180, 26, 160) + S.P('M33 40L-20 190L86 190Z') + S.rc(355, 200, 24, 140) + S.P('M367 70L320 210L414 210Z');
    s += S.P('M-10 330Q200 300 410 330L410 410L-10 410Z');
    s += S.el(110, 350, 30, 12) + S.L('M300 360q10 -20 20 0q10 -20 20 0', 0.8);
    return s;
  };
  C.estrada = function () {
    var s = S.c(340, 60, 28) + S.raios(340, 60, 36, 52, 9, 7) + S.cloud(90, 70, 50) + S.P('M-10 260Q120 220 250 250T410 240L410 300L-10 300Z');
    s += S.rc(-10, 300, 420, 110) + S.L('M10 355h50M110 355h50M210 355h50M310 355h50');
    return s;
  };
  C.praia = function () {
    var s = S.c(330, 70, 32) + S.raios(330, 70, 40, 58, 10, 7) + S.cloud(90, 60, 45);
    s += S.P('M-10 240Q100 225 200 240T410 240L410 410L-10 410Z') + S.L('M20 270q20 -10 40 0M300 265q20 -10 40 0', 0.8);
    s += S.P('M-10 330Q150 300 410 340L410 410L-10 410Z');
    return s;
  };

  // Registra um desenho em duas versões: sozinho e com cenário
  FIG.obj = function (o) {
    FIG.add({ id: o.id, nome: o.nome, cat: o.cat, nivel: o.nivel || 1, d: o.d });
    if (o.cen) {
      var p = o.cen === 'mesa' ? [96, 72, 0.52] : (o.pos || [70, 95, 0.66]);
      FIG.add({
        id: o.id + '-c', nome: o.nome, cat: o.cat, nivel: Math.min(3, (o.nivel || 1) + 1),
        d: function () { return FIG.cenario[o.cen]() + S.T(p[0], p[1], p[2], o.d); }
      });
    }
  };
})();
