/* Pintando o Sete — aplicação (telas, catálogo, galeria, autoria, som) */
(function () {
  'use strict';
  var F = window.FIG, ICO = window.ICO;
  var $ = function (id) { return document.getElementById(id); };
  var LS = {
    get: function (k, d) { try { var v = localStorage.getItem('p7-' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('p7-' + k, JSON.stringify(v)); } catch (e) { /* sem espaço */ } }
  };

  /* ---------------- categorias ---------------- */
  var CATS = [
    ['animais', 'Animais', 'gato', '#ffd6a5'], ['natureza', 'Natureza', 'sol', '#caffbf'], ['comidas', 'Comidas', 'maca', '#ffadad'],
    ['transportes', 'Transportes', 'carro', '#9bf6ff'], ['brinquedos', 'Brinquedos e casa', 'bola', '#fdffb6'], ['tecnologia', 'Tecnologia', 'computador', '#a0c4ff'],
    ['pessoas', 'Crianças', 'rosto-3', '#ffc6ff'], ['letras', 'Letras', 'letra-A', '#ffd6a5'], ['numeros', 'Números', 'numero-3', '#caffbf'],
    ['formas', 'Formas', 'formas-casa', '#9bf6ff'], ['mandalas', 'Mandalas', 'mandala-1', '#bdb2ff'], ['padroes', 'Padrões', 'padrao-coracoes-1', '#ffadad'],
    ['robos', 'Robôs', 'robo-1', '#a0c4ff'], ['monstros', 'Monstrinhos', 'monstro-2', '#caffbf'], ['cenas', 'Cenas', 'cena-1', '#fdffb6']
  ];
  var AVATARES = [
    ['gato', '#ffadad'], ['cachorro', '#ffd6a5'], ['peixe', '#9bf6ff'], ['coruja', '#bdb2ff'], ['coelho', '#ffc6ff'], ['leao', '#fdffb6'],
    ['sapo', '#caffbf'], ['tartaruga', '#a0c4ff'], ['abelha', '#ffe066'], ['macaco', '#e9c46a'], ['porco', '#f4acb7'], ['polvo', '#cdb4db'],
    ['urso', '#d4a373'], ['elefante', '#bde0fe'], ['girafa', '#ffd60a'], ['joaninha', '#ff8fa3']
  ];
  var CORES = ['#e63946', '#f4845f', '#ff9f1c', '#ffd60a', '#fff3b0', '#8ac926', '#2a9d8f', '#1b7f3b', '#8ecae6', '#1e88e5', '#283593', '#7b2cbf', '#c77dff', '#f78fb3',
    '#ffe0cc', '#f1c27d', '#e0ac69', '#c68642', '#8d5524', '#5c3a1e', '#9e9e9e', '#212121', '#ffffff', 'arco'];

  var estado = {
    cat: LS.get('cat', 'animais'), nivel: LS.get('nivel', 0), som: LS.get('som', true),
    autor: LS.get('autor', null), nome: LS.get('nome', ''), fig: null, obraId: null, galeriaTodos: false
  };

  /* ---------------- miniaturas ---------------- */
  var cacheMini = {};
  function urlFig(id) {
    if (!cacheMini[id]) cacheMini[id] = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(F.svg(F.porId[id]));
    return cacheMini[id];
  }
  function imgFig(id, cls) { var i = new Image(); i.src = urlFig(id); i.alt = ''; i.draggable = false; i.decoding = 'async'; if (cls) i.className = cls; return i; }
  function avatarEl(av, cls) {
    var d = document.createElement('span');
    d.className = 'avatar ' + (cls || '');
    var a = AVATARES.find(function (x) { return x[0] === av; }) || AVATARES[0];
    d.style.background = a[1];
    d.appendChild(imgFig(a[0]));
    return d;
  }

  /* ---------------- som e fala ---------------- */
  var audio = null;
  function bip(tipo) {
    if (!estado.som) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      var o = audio.createOscillator(), g = audio.createGain(), t = audio.currentTime;
      var f = { toque: [520, 700], balde: [400, 900], salvar: [600, 1200], erro: [300, 200] }[tipo] || [500, 600];
      o.type = 'sine'; o.frequency.setValueAtTime(f[0], t); o.frequency.exponentialRampToValueAtTime(f[1], t + 0.12);
      g.gain.setValueAtTime(0.15, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      o.connect(g); g.connect(audio.destination); o.start(t); o.stop(t + 0.22);
    } catch (e) { /* sem áudio */ }
  }
  var vozPt = null;
  function falar(txt) {
    if (!estado.som || !('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(txt.replace(/—/g, ','));
      u.lang = 'pt-BR'; u.rate = 0.9;
      if (!vozPt) vozPt = speechSynthesis.getVoices().find(function (v) { return /pt(-|_)BR/i.test(v.lang); }) || null;
      if (vozPt) u.voice = vozPt;
      speechSynthesis.speak(u);
    } catch (e) { /* ok */ }
  }

  /* ---------------- telas ---------------- */
  function mostrar(id) {
    document.querySelectorAll('.tela').forEach(function (t) { t.classList.toggle('ativa', t.id === id); });
  }
  function icone(el, svg) { el.innerHTML = svg; }

  /* ---------------- tela inicial ---------------- */
  function montarInicio() {
    icone(document.querySelector('.logo-icone'), ICO.paleta);
    icone($('btn-surpresa'), ICO.dado);
    icone($('btn-galeria'), ICO.pasta);
    icone($('btn-professor'), ICO.professor);
    atualizarSom();
    atualizarAutor();

    var nav = $('categorias');
    CATS.forEach(function (c) {
      var b = document.createElement('button');
      b.className = 'cat';
      b.dataset.cat = c[0];
      b.style.setProperty('--cor', c[3]);
      b.setAttribute('aria-label', c[1]);
      b.title = c[1];
      b.appendChild(imgFig(c[2]));
      b.onclick = function () { bip('toque'); falar(c[1]); estado.cat = c[0]; LS.set('cat', c[0]); renderGrade(); marcarCat(); $('grade').scrollTop = 0; };
      nav.appendChild(b);
    });
    var nv = $('niveis');
    [0, 1, 2, 3].forEach(function (k) {
      var b = document.createElement('button');
      b.className = 'nivel';
      b.dataset.nivel = k;
      b.setAttribute('aria-label', k ? 'Dificuldade ' + k : 'Todas as dificuldades');
      b.innerHTML = k ? [1, 2, 3].map(function (i) { return '<span>' + ICO.estrela(i <= k) + '</span>'; }).join('') : '<span>' + ICO.todos + '</span>';
      b.onclick = function () { bip('toque'); estado.nivel = k; LS.set('nivel', k); renderGrade(); marcarNivel(); };
      nv.appendChild(b);
    });
    marcarCat(); marcarNivel(); renderGrade();

    $('btn-surpresa').onclick = function () {
      var l = listaFiltrada(true);
      abrirFigura(l[Math.floor(Math.random() * l.length)].id);
    };
    $('btn-galeria').onclick = function () { bip('toque'); abrirGaleria(); };
    $('btn-som').onclick = function () { estado.som = !estado.som; LS.set('som', estado.som); atualizarSom(); bip('toque'); };
    $('btn-autor').onclick = function () { bip('toque'); escolherAutor(); };
    $('btn-professor').onclick = function () { $('prof-total').textContent = 'Catálogo atual: ' + F.lista.length + ' figuras em ' + CATS.length + ' categorias, com 3 níveis de dificuldade.'; $('dlg-professor').showModal(); };
    $('prof-fechar').onclick = function () { $('dlg-professor').close(); };
    icone($('prof-fechar'), ICO.sim);
    $('prof-apagar').onclick = function () {
      if (confirm('Apagar todos os desenhos guardados neste aparelho?')) db.limpar().then(function () { alert('Pronto: galeria apagada.'); });
    };
  }
  function marcarCat() {
    document.querySelectorAll('.cat').forEach(function (b) { b.classList.toggle('sel', b.dataset.cat === estado.cat); b.setAttribute('aria-pressed', b.dataset.cat === estado.cat); });
    var s = document.querySelector('.cat.sel'); if (s && s.scrollIntoView) s.scrollIntoView({ block: 'nearest', inline: 'center' });
  }
  function marcarNivel() { document.querySelectorAll('.nivel').forEach(function (b) { b.classList.toggle('sel', +b.dataset.nivel === estado.nivel); }); }
  function atualizarSom() { icone($('btn-som'), estado.som ? ICO.somOn : ICO.somOff); }
  function atualizarAutor() {
    var b = $('btn-autor'); b.innerHTML = '';
    if (estado.autor) b.appendChild(avatarEl(estado.autor)); else b.innerHTML = '<span class="avatar vazio">' + ICO.pergunta + '</span>';
  }
  function listaFiltrada(todasCats) {
    return F.lista.filter(function (f) { return (todasCats || f.cat === estado.cat) && (!estado.nivel || f.nivel === estado.nivel); });
  }
  function renderGrade() {
    var g = $('grade'); g.innerHTML = '';
    var frag = document.createDocumentFragment();
    listaFiltrada(false).forEach(function (f) {
      var b = document.createElement('button');
      b.className = 'mini n' + f.nivel;
      b.setAttribute('aria-label', f.nome);
      b.title = f.nome;
      var im = imgFig(f.id); im.loading = 'lazy';
      b.appendChild(im);
      var nv = document.createElement('span'); nv.className = 'pontos'; nv.innerHTML = '<i></i>'.repeat(f.nivel); b.appendChild(nv);
      b.onclick = function () { abrirFigura(f.id); };
      frag.appendChild(b);
    });
    g.appendChild(frag);
  }

  /* ---------------- autoria ---------------- */
  function escolherAutor(depois) {
    var lista = $('lista-avatares'); lista.innerHTML = '';
    var sel = estado.autor;
    AVATARES.forEach(function (a) {
      var b = document.createElement('button');
      b.className = 'opc-avatar' + (a[0] === sel ? ' sel' : '');
      b.setAttribute('aria-label', F.porId[a[0]].nome);
      b.appendChild(avatarEl(a[0]));
      b.onclick = function () { sel = a[0]; bip('toque'); falar(F.porId[a[0]].nome); lista.querySelectorAll('.opc-avatar').forEach(function (x) { x.classList.toggle('sel', x === b); }); };
      lista.appendChild(b);
    });
    $('nome-autor').value = estado.nome || '';
    icone($('autor-ok'), ICO.sim);
    icone(document.querySelector('#dlg-autor .ico-pergunta'), ICO.pergunta);
    icone(document.querySelector('.ico-lapis-peq'), ICO.lapisPeq);
    $('autor-ok').onclick = function () {
      if (!sel) { bip('erro'); return; }
      estado.autor = sel; estado.nome = $('nome-autor').value.trim();
      LS.set('autor', sel); LS.set('nome', estado.nome);
      $('dlg-autor').close(); atualizarAutor(); precarregarAvatar(); bip('salvar');
      if (depois) depois();
    };
    $('dlg-autor').showModal();
  }

  /* ---------------- confirmação por ícones ---------------- */
  function confirmar(svgIcone) {
    return new Promise(function (ok) {
      icone($('confirmar-ico'), svgIcone); icone($('conf-sim'), ICO.sim); icone($('conf-nao'), ICO.nao);
      var d = $('dlg-confirmar');
      $('conf-sim').onclick = function () { d.close(); ok(true); };
      $('conf-nao').onclick = function () { d.close(); ok(false); };
      d.showModal();
    });
  }

  /* ---------------- tela de pintura ---------------- */
  var pint;
  function montarPintura() {
    pint = new window.Pintura($('cv-tinta'), $('cv-linhas'));
    pint.onPintou = function (t) { if (t === 'balde') bip('balde'); };
    icone($('btn-voltar'), ICO.casa); icone($('btn-desfazer'), ICO.desfazer); icone($('btn-limpar'), ICO.lixo);
    icone($('btn-salvar'), ICO.salvar); icone($('btn-baixar'), ICO.baixar);

    var fs = $('ferramentas');
    [['balde', 'Balde: pinta a área toda'], ['magico', 'Pincel mágico: não sai da linha'], ['lapis', 'Lápis: pinta livre'], ['borracha', 'Borracha']].forEach(function (t) {
      var b = document.createElement('button');
      b.className = 'ferr'; b.dataset.f = t[0]; b.setAttribute('aria-label', t[1]); b.title = t[1];
      b.innerHTML = ICO[t[0]];
      b.onclick = function () { bip('toque'); pint.ferramenta = t[0]; marcarFerr(); };
      fs.appendChild(b);
    });
    var ts = $('tamanhos');
    [0, 1, 2].forEach(function (k) {
      var b = document.createElement('button');
      b.className = 'tam'; b.dataset.t = k; b.setAttribute('aria-label', ['Fino', 'Médio', 'Grosso'][k]);
      b.innerHTML = '<i style="width:' + [8, 16, 28][k] + 'px;height:' + [8, 16, 28][k] + 'px"></i>';
      b.onclick = function () { bip('toque'); pint.tamanho = k; if (pint.ferramenta === 'balde') pint.ferramenta = 'magico'; marcarFerr(); };
      ts.appendChild(b);
    });
    var pal = $('paleta');
    CORES.forEach(function (c) {
      var b = document.createElement('button');
      b.className = 'cor' + (c === 'arco' ? ' arco' : '') + (c === '#ffffff' ? ' branca' : '');
      b.dataset.c = c;
      if (c !== 'arco') b.style.background = c;
      b.setAttribute('aria-label', c === 'arco' ? 'Arco-íris' : 'Cor ' + c);
      b.onclick = function () { bip('toque'); pint.cor = c; if (pint.ferramenta === 'borracha') pint.ferramenta = 'balde'; marcarFerr(); };
      pal.appendChild(b);
    });
    pint.cor = CORES[0];
    marcarFerr();

    $('btn-desfazer').onclick = function () { if (pint.voltar()) bip('toque'); else bip('erro'); };
    $('btn-limpar').onclick = function () { bip('toque'); confirmar(ICO.lixo).then(function (s) { if (s) { pint.limpar(); bip('balde'); } }); };
    $('btn-salvar').onclick = function () { salvarObra(true); };
    $('btn-baixar').onclick = baixar;
    $('btn-voltar').onclick = function () {
      bip('toque');
      var fim = function () { mostrar('tela-inicio'); renderGrade(); };
      if (pint.alterado) salvarObra(false).then(fim, fim); else fim();
    };
    window.addEventListener('resize', ajustarQuadro);
  }
  function marcarFerr() {
    document.querySelectorAll('.ferr').forEach(function (b) { b.classList.toggle('sel', b.dataset.f === pint.ferramenta); b.style.color = pint.cor === 'arco' ? '#e63946' : pint.cor; });
    document.querySelectorAll('.tam').forEach(function (b) { b.classList.toggle('sel', +b.dataset.t === pint.tamanho); b.classList.toggle('apagado', pint.ferramenta === 'balde'); });
    document.querySelectorAll('.cor').forEach(function (b) { b.classList.toggle('sel', b.dataset.c === pint.cor); });
  }
  function ladoQuadro() {
    var a = $('area'), r = a.getBoundingClientRect();
    return Math.max(200, Math.floor(Math.min(r.width, r.height) - 16));
  }
  function ajustarQuadro() {
    var q = $('quadro'), l = ladoQuadro();
    q.style.width = q.style.height = l + 'px';
  }
  function abrirFigura(id, obra) {
    var f = F.porId[id];
    if (!f) return;
    bip('toque');
    falar(f.nome);
    estado.fig = f;
    estado.obraId = obra ? obra.id : null;
    mostrar('tela-pintar');
    ajustarQuadro();
    $('carregando').classList.add('vis');
    requestAnimationFrame(function () {
      pint.carregar(F.svg(f), ladoQuadro(), obra ? obra.tinta : null).then(function () { $('carregando').classList.remove('vis'); });
    });
  }

  function assinatura(x, lado) {
    if (!estado.autor) return;
    var r = lado * 0.055, cx = lado - r - lado * 0.02, cy = lado - r - lado * 0.02;
    var a = AVATARES.find(function (v) { return v[0] === estado.autor; }) || AVATARES[0];
    x.save();
    x.fillStyle = a[1]; x.strokeStyle = '#2b2d42'; x.lineWidth = lado * 0.004;
    x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.stroke();
    if (cacheAvatar[a[0]]) x.drawImage(cacheAvatar[a[0]], cx - r * 0.8, cy - r * 0.8, r * 1.6, r * 1.6);
    if (estado.nome) {
      x.font = 'bold ' + Math.round(lado * 0.035) + 'px sans-serif';
      x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillStyle = '#2b2d42';
      x.fillText(estado.nome, cx - r - lado * 0.015, cy);
    }
    x.restore();
  }
  var cacheAvatar = {};
  function precarregarAvatar() {
    if (!estado.autor || cacheAvatar[estado.autor]) return;
    var i = new Image(); i.onload = function () { cacheAvatar[estado.autor] = i; }; i.src = urlFig(estado.autor);
  }

  function baixar() {
    bip('salvar');
    precarregarAvatar();
    setTimeout(function () {
      var c = pint.composicao(1000, assinatura);
      c.toBlob(function (blob) {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'pintando-o-sete-' + estado.fig.id + '-' + new Date().toISOString().slice(0, 10) + '.png';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
      }, 'image/png');
    }, 80);
  }

  function festa() {
    var f = $('festa'); f.innerHTML = '';
    for (var i = 0; i < 14; i++) {
      var s = document.createElement('span');
      s.innerHTML = ICO.estrela(true);
      s.style.left = (10 + Math.random() * 80) + '%'; s.style.animationDelay = (Math.random() * 0.3) + 's';
      f.appendChild(s);
    }
    f.classList.remove('vis'); void f.offsetWidth; f.classList.add('vis');
  }

  function salvarObra(comFesta) {
    var fazer = function () {
      var mini = pint.composicao(220, null).toDataURL('image/jpeg', 0.7);
      return new Promise(function (ok) {
        pint.cvT.toBlob(function (blob) {
          var obra = { fig: estado.fig.id, autor: estado.autor || 'anonimo', nome: estado.nome, data: Date.now(), mini: mini, tinta: blob };
          if (estado.obraId) obra.id = estado.obraId;
          db.salvar(obra).then(function (id) { estado.obraId = id; pint.alterado = false; if (comFesta) { bip('salvar'); festa(); } ok(); }, function () { bip('erro'); ok(); });
        }, 'image/png');
      });
    };
    if (comFesta && !estado.autor) return new Promise(function (ok) { escolherAutor(function () { fazer().then(ok); }); });
    return fazer();
  }

  /* ---------------- galeria (IndexedDB) ---------------- */
  var db = (function () {
    var p = null;
    function abrir() {
      if (p) return p;
      p = new Promise(function (ok, erro) {
        if (!window.indexedDB) return erro(new Error('sem indexedDB'));
        var r = indexedDB.open('pintando-o-sete', 1);
        r.onupgradeneeded = function () { r.result.createObjectStore('obras', { keyPath: 'id', autoIncrement: true }); };
        r.onsuccess = function () { ok(r.result); };
        r.onerror = function () { erro(r.error); };
      });
      return p;
    }
    function tx(modo, fn) {
      return abrir().then(function (d) {
        return new Promise(function (ok, erro) {
          var t = d.transaction('obras', modo), st = t.objectStore('obras'), res = fn(st);
          t.oncomplete = function () { ok(res && res.result !== undefined ? res.result : res); };
          t.onerror = function () { erro(t.error); };
        });
      });
    }
    return {
      salvar: function (o) { return tx('readwrite', function (st) { return st.put(o); }); },
      todas: function () { return tx('readonly', function (st) { return st.getAll(); }); },
      apagar: function (id) { return tx('readwrite', function (st) { return st.delete(id); }); },
      limpar: function () { return tx('readwrite', function (st) { return st.clear(); }); }
    };
  })();

  function abrirGaleria() {
    mostrar('tela-galeria');
    icone($('btn-galeria-voltar'), ICO.casa);
    icone(document.querySelector('.ico-pasta'), ICO.pasta);
    icone($('btn-galeria-todos'), ICO.pessoas);
    var ga = $('galeria-avatar'); ga.innerHTML = '';
    if (estado.autor && !estado.galeriaTodos) ga.appendChild(avatarEl(estado.autor));
    $('btn-galeria-todos').classList.toggle('sel', estado.galeriaTodos);
    var g = $('grade-galeria'); g.innerHTML = '';
    db.todas().then(function (lista) {
      lista = lista.filter(function (o) { return estado.galeriaTodos || !estado.autor || o.autor === estado.autor; }).sort(function (a, b) { return b.data - a.data; });
      if (!lista.length) { g.innerHTML = '<div class="vazio-galeria">' + ICO.pasta + '</div>'; return; }
      lista.forEach(function (o) {
        var card = document.createElement('div'); card.className = 'obra';
        var b = document.createElement('button'); b.className = 'mini';
        b.setAttribute('aria-label', 'Continuar pintando');
        var im = new Image(); im.src = o.mini; im.alt = ''; b.appendChild(im);
        b.onclick = function () { if (F.porId[o.fig]) abrirFigura(o.fig, o); };
        card.appendChild(b);
        if (o.autor && o.autor !== 'anonimo') card.appendChild(avatarEl(o.autor, 'selo'));
        var x = document.createElement('button'); x.className = 'apagar'; x.setAttribute('aria-label', 'Apagar'); x.innerHTML = ICO.lixo;
        x.onclick = function () { confirmar(ICO.lixo).then(function (s) { if (s) db.apagar(o.id).then(abrirGaleria); }); };
        card.appendChild(x);
        g.appendChild(card);
      });
    }, function () { g.innerHTML = '<div class="vazio-galeria">' + ICO.pasta + '</div>'; });
  }
  $('btn-galeria-voltar').onclick = function () { bip('toque'); mostrar('tela-inicio'); };
  $('btn-galeria-todos').onclick = function () { bip('toque'); estado.galeriaTodos = !estado.galeriaTodos; abrirGaleria(); };

  /* ---------------- início ---------------- */
  montarInicio();
  montarPintura();
  precarregarAvatar();
  if (!estado.autor) setTimeout(function () { escolherAutor(function () { precarregarAvatar(); }); }, 400);
  if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = function () { vozPt = null; };
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(function () { /* ok */ });
  window.__P7 = { estado: estado, pint: function () { return pint; }, abrirFigura: abrirFigura, db: db };
})();
