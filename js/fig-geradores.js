/* Figuras geradas: letras, números, formas, mandalas, padrões, robôs, monstrinhos, rostos e cenas */
(function () {
  'use strict';
  var F = window.FIG, S = window.S;
  var c = S.c, el = S.el, rc = S.rc, P = S.P, L = S.L, pg = S.pg, ln = S.ln, eye = S.eye, dot = S.dot, smile = S.smile, PRETO = S.PRETO, n = S.n;
  var PI = Math.PI;

  /* ============ LETRAS (traço "balão": contorno preto, miolo branco) ============ */
  var LETRA = {
    A: 'M0 140L50 0L100 140M22 88L78 88',
    B: 'M10 0L10 140M10 0L55 0Q90 0 90 35Q90 68 55 68L10 68M55 68Q95 68 95 104Q95 140 55 140L10 140',
    C: 'M95 25Q80 0 50 0Q5 0 5 70Q5 140 50 140Q80 140 95 115',
    D: 'M10 0L10 140M10 0L45 0Q95 0 95 70Q95 140 45 140L10 140',
    E: 'M90 0L10 0L10 140L90 140M10 70L75 70',
    F: 'M90 0L10 0L10 140M10 70L75 70',
    G: 'M95 25Q80 0 50 0Q5 0 5 70Q5 140 50 140Q95 140 95 85L60 85',
    H: 'M10 0L10 140M90 0L90 140M10 70L90 70',
    I: 'M50 0L50 140M20 0L80 0M20 140L80 140',
    J: 'M40 0L90 0M90 0L90 100Q90 140 50 140Q10 140 10 105',
    K: 'M10 0L10 140M90 0L10 85M38 60L92 140',
    L: 'M10 0L10 140L90 140',
    M: 'M5 140L5 0L50 80L95 0L95 140',
    N: 'M10 140L10 0L90 140L90 0',
    O: 'M50 0C115 0 115 140 50 140C-15 140 -15 0 50 0Z',
    P: 'M10 140L10 0L55 0Q95 0 95 37Q95 75 55 75L10 75',
    Q: 'M50 0C115 0 115 140 50 140C-15 140 -15 0 50 0ZM62 100L100 145',
    R: 'M10 140L10 0L55 0Q95 0 95 37Q95 75 55 75L10 75M50 75L95 140',
    S: 'M92 22Q80 0 50 0Q8 0 8 36Q8 66 50 70Q92 74 92 106Q92 140 50 140Q15 140 5 115',
    T: 'M0 0L100 0M50 0L50 140',
    U: 'M10 0L10 95Q10 140 50 140Q90 140 90 95L90 0',
    V: 'M0 0L50 140L100 0',
    W: 'M0 0L25 140L50 50L75 140L100 0',
    X: 'M5 0L95 140M95 0L5 140',
    Y: 'M0 0L50 70L100 0M50 70L50 140',
    Z: 'M5 0L95 0L5 140L95 140'
  };
  var DIG = {
    0: 'M50 0C110 0 110 140 50 140C-10 140 -10 0 50 0Z',
    1: 'M25 30L58 0L58 140M25 140L90 140',
    2: 'M10 30Q20 0 50 0Q90 0 90 38Q90 65 50 95L10 140L92 140',
    3: 'M10 20Q25 0 50 0Q88 0 88 35Q88 68 50 68Q92 68 92 104Q92 140 50 140Q20 140 8 118',
    4: 'M70 140L70 0L5 95L95 95',
    5: 'M88 0L20 0L12 62Q30 52 50 52Q92 52 92 96Q92 140 50 140Q20 140 8 120',
    6: 'M85 15Q72 0 52 0Q8 0 8 75Q8 140 52 140Q92 140 92 98Q92 58 52 58Q15 58 8 90',
    7: 'M5 0L95 0L40 140',
    8: 'M50 68Q12 68 12 34Q12 0 50 0Q88 0 88 34Q88 68 50 68Q8 68 8 104Q8 140 50 140Q92 140 92 104Q92 68 50 68Z',
    9: 'M92 50Q85 82 48 82Q8 82 8 41Q8 0 50 0Q92 0 92 60Q92 140 45 140Q22 140 12 125'
  };
  // desenha um texto em "letra balão" na caixa (x, y) com altura h
  function balao(chars, x, y, h, tabela) {
    var k = h / 140, larg = 26, paths = '';
    chars.split('').forEach(function (ch, i) {
      paths += '<path transform="translate(' + n(x + i * 125 * k) + ' ' + n(y) + ') scale(' + (Math.round(k * 1000) / 1000) + ')" d="' + tabela[ch] + '" stroke-width="@"/>';
    });
    return '<g fill="none" stroke="#000">' + paths.replace(/@/g, n(larg)) + '</g>' +
      '<g fill="none" stroke="#fff">' + paths.replace(/@/g, n(larg - (2 * F.W) / k)) + '</g>';
  }

  // figura associada a cada letra (objetos já desenhados)
  var PALAVRA = { A: 'abelha', B: 'bola', C: 'casa', D: 'dado', E: 'estrela', F: 'flor', G: 'gato', H: 'helicoptero', I: 'ilha', J: 'jacare', K: 'kiwi', L: 'lua', M: 'maca', N: 'navio', O: 'ovo', P: 'peixe', Q: 'queijo', R: 'robo', S: 'sol', T: 'tartaruga', U: 'uva', V: 'vaca', W: 'wifi', X: 'xicara', Y: 'ioio', Z: 'zebra' };

  Object.keys(LETRA).forEach(function (ch) {
    F.add({ id: 'letra-' + ch, nome: 'Letra ' + ch, cat: 'letras', nivel: 1, d: function () {
      return rc(15, 15, 370, 370, 30) + balao(ch, 128, 55, 290, LETRA);
    } });
  });
  Object.keys(LETRA).forEach(function (ch) {
    F.add({ id: 'letra-' + ch + '-f', nome: 'Letra ' + ch + ' — ' + F.porId[PALAVRA[ch]].nome, cat: 'letras', nivel: 2, d: function () {
      return rc(15, 15, 370, 370, 30) + balao(ch, 40, 40, 200, LETRA) + ln(30, 255, 370, 255, 0.5) + S.T(185, 165, 0.52, function () { return F.miolo(PALAVRA[ch]); });
    } });
  });

  /* ============ NÚMEROS ============ */
  function iconeContagem(tipo, x, y, r) {
    if (tipo === 0) return S.star(x, y, r, r * 0.45);
    if (tipo === 1) return S.heart(x, y + r * 0.1, r * 1.9);
    if (tipo === 2) return c(x, y, r * 0.8) + L('M' + n(x - r * 0.8) + ' ' + n(y) + 'Q' + n(x) + ' ' + n(y + r * 0.6) + ' ' + n(x + r * 0.8) + ' ' + n(y), 0.6);
    return S.flor(x, y, r * 0.5, 5);
  }
  for (var k = 0; k <= 20; k++) (function (k) {
    F.add({ id: 'numero-' + k, nome: 'Número ' + k, cat: 'numeros', nivel: k <= 10 ? 1 : 2, d: function () {
      var txt = String(k), h = 165, w = txt.length * 125 * (h / 140);
      var s = rc(15, 15, 370, 370, 30) + balao(txt, 200 - w / 2 + 10, 35, h, DIG);
      if (k <= 10) {
        var tipo = k % 4, por = k <= 5 ? k : Math.ceil(k / 2), linhas = k <= 5 ? 1 : 2, r = 31, dx = 70;
        for (var i = 0; i < k; i++) {
          var lin = Math.floor(i / por), col = i % por, nl = lin === linhas - 1 ? k - por * lin : por;
          s += iconeContagem(tipo, 200 + (col - (nl - 1) / 2) * dx, (linhas === 1 ? 300 : 260 + lin * 72), r);
        }
      } else {
        // dois quadros de dez (ten frames), um ponto por casa
        for (var q = 0; q < 2; q++) {
          var x0 = 30 + q * 180, y0 = 245, cel = 32;
          s += rc(x0, y0, cel * 5, cel * 2, 4) + ln(x0, y0 + cel, x0 + cel * 5, y0 + cel);
          for (var j = 1; j < 5; j++) s += ln(x0 + j * cel, y0, x0 + j * cel, y0 + cel * 2);
          for (var j2 = 0; j2 < 10; j2++) if (q * 10 + j2 < k) s += c(x0 + (j2 % 5) * cel + cel / 2, y0 + Math.floor(j2 / 5) * cel + cel / 2, 11);
        }
        s += S.star(200, 345, 22, 9);
      }
      return s;
    } });
  })(k);

  /* ============ FORMAS GEOMÉTRICAS ============ */
  var Fo = 'formas';
  var basicas = [
    ['circulo', 'Círculo', function () { return c(200, 200, 150) + eye(160, 180, 14) + eye(240, 180, 14) + smile(200, 230, 35, 12); }],
    ['quadrado', 'Quadrado', function () { return rc(60, 60, 280, 280, 8) + eye(160, 180, 14) + eye(240, 180, 14) + smile(200, 230, 35, 12); }],
    ['triangulo', 'Triângulo', function () { return pg([200, 40, 360, 340, 40, 340]) + eye(170, 230, 14) + eye(230, 230, 14) + smile(200, 275, 30, 10); }],
    ['retangulo', 'Retângulo', function () { return rc(30, 110, 340, 190, 8) + eye(160, 180, 14) + eye(240, 180, 14) + smile(200, 230, 35, 12); }],
    ['losango', 'Losango', function () { return pg([200, 30, 340, 200, 200, 370, 60, 200]) + eye(170, 185, 14) + eye(230, 185, 14) + smile(200, 230, 30, 10); }],
    ['pentagono', 'Pentágono', function () { return S.reg(200, 210, 165, 5) + eye(165, 190, 14) + eye(235, 190, 14) + smile(200, 240, 35, 12); }],
    ['hexagono', 'Hexágono', function () { return S.reg(200, 200, 165, 6, 0) + eye(165, 180, 14) + eye(235, 180, 14) + smile(200, 230, 35, 12); }],
    ['oval', 'Oval', function () { return el(200, 200, 110, 165) + eye(165, 180, 14) + eye(235, 180, 14) + smile(200, 230, 35, 12); }],
    ['estrela-f', 'Estrela', function () { return S.star(200, 210, 180, 75) + eye(172, 200, 12) + eye(228, 200, 12); }],
    ['coracao', 'Coração', function () { return S.heart(200, 200, 330) + eye(160, 170, 14) + eye(240, 170, 14) + smile(200, 220, 35, 12); }]
  ];
  basicas.forEach(function (b) { F.add({ id: b[0], nome: b[1], cat: Fo, nivel: 1, d: b[2] }); });
  // tudo junto
  F.add({ id: 'formas-todas', nome: 'Formas', cat: Fo, nivel: 2, d: function () {
    return c(100, 100, 65) + rc(225, 40, 130, 130, 6) + pg([100, 215, 170, 345, 30, 345]) + S.reg(290, 280, 75, 6, 0) + S.star(200, 205, 40, 17);
  } });
  var compostas = [
    ['formas-casa', 'Casa de formas', function () { return pg([40, 190, 200, 50, 360, 190]) + rc(70, 190, 260, 180) + rc(170, 270, 60, 100) + rc(95, 215, 55, 55) + rc(250, 215, 55, 55) + c(200, 135, 25) + c(220, 320, 6); }],
    ['formas-foguete', 'Foguete de formas', function () { return pg([200, 20, 270, 120, 130, 120]) + pg([130, 260, 80, 340, 130, 320]) + pg([270, 260, 320, 340, 270, 320]) + rc(130, 120, 140, 200) + c(200, 190, 35) + pg([150, 320, 250, 320, 200, 385]); }],
    ['formas-peixe', 'Peixe de formas', function () { return pg([110, 200, 30, 120, 30, 280]) + pg([110, 200, 230, 90, 350, 200, 230, 310]) + c(280, 185, 18) + pg([200, 160, 240, 200, 200, 240]) + pg([230, 90, 190, 60, 260, 110]); }],
    ['formas-arvore', 'Árvore de formas', function () { return rc(175, 300, 50, 80) + pg([200, 160, 330, 310, 70, 310]) + pg([200, 100, 310, 230, 90, 230]) + pg([200, 30, 280, 150, 120, 150]) + c(150, 270, 12) + c(250, 250, 12) + c(200, 190, 12); }],
    ['formas-trem', 'Trem de formas', function () { return rc(40, 160, 130, 130) + rc(170, 200, 110, 90) + rc(280, 200, 90, 90) + rc(60, 100, 40, 60) + rc(70, 180, 70, 50) + c(80, 300, 30) + c(150, 300, 30) + c(225, 300, 28) + c(325, 300, 28) + ln(20, 335, 380, 335); }],
    ['formas-barco', 'Barco de formas', function () { return pg([40, 260, 360, 260, 300, 340, 100, 340]) + rc(193, 60, 14, 200) + pg([190, 70, 190, 240, 70, 240]) + pg([210, 90, 330, 240, 210, 240]) + c(150, 300, 12) + c(250, 300, 12); }],
    ['formas-robo', 'Robô de formas', function () { return rc(120, 60, 160, 120, 10) + c(165, 115, 22) + c(235, 115, 22) + rc(160, 150, 80, 15) + rc(100, 190, 200, 130, 10) + pg([200, 220, 240, 290, 160, 290]) + rc(130, 320, 45, 60) + rc(225, 320, 45, 60) + rc(50, 200, 50, 30) + rc(300, 200, 50, 30) + ln(200, 60, 200, 30) + c(200, 25, 12); }],
    ['formas-sorvete', 'Sorvete de formas', function () { return pg([130, 200, 270, 200, 200, 380]) + c(160, 170, 45) + c(240, 170, 45) + c(200, 110, 50) + c(200, 50, 15); }]
  ];
  compostas.forEach(function (b, i) { F.add({ id: b[0], nome: b[1], cat: Fo, nivel: i < 4 ? 1 : 2, d: b[2] }); });

  /* ============ MANDALAS ============ */
  function mandala(seed, nivel) {
    var r = F.rng(seed), sim = [6, 8, 8, 10, 12, 12, 16][Math.floor(r() * (nivel === 1 ? 3 : 7))];
    var aneis = nivel === 1 ? 3 : nivel === 2 ? 4 + Math.floor(r() * 2) : 6 + Math.floor(r() * 2);
    var s = "", R = 178;
    var passo = (R - 25) / aneis;
    for (var a = 0; a < aneis; a++) {
      var r2 = R - a * passo, r1 = r2 - passo, tipo = Math.floor(r() * 6), off = (a % 2) * (PI / sim), k = sim * (a === 0 && nivel === 3 ? 2 : 1);
      s += c(200, 200, r2);
      for (var i = 0; i < k; i++) {
        var ang = (i / k) * PI * 2 + off, ca = Math.cos(ang), sa = Math.sin(ang), larg = (PI * 2 * r1) / k * 0.5;
        var px = function (rr, d) { return n(200 + ca * rr - sa * d) + ' ' + n(200 + sa * rr + ca * d); };
        if (tipo === 0) s += P('M' + px(r1, 0) + 'Q' + px((r1 + r2) / 2, larg * 1.1) + ' ' + px(r2 - 3, 0) + 'Q' + px((r1 + r2) / 2, -larg * 1.1) + ' ' + px(r1, 0) + 'Z');
        else if (tipo === 1) s += c(200 + ca * (r1 + r2) / 2, 200 + sa * (r1 + r2) / 2, Math.min(passo * 0.42, larg * 0.9));
        else if (tipo === 2) s += P('M' + px(r1, -larg) + 'L' + px(r2 - 2, 0) + 'L' + px(r1, larg) + 'Z');
        else if (tipo === 3) s += P('M' + px(r2, -larg * 1.6) + 'Q' + px(r1 - 4, 0) + ' ' + px(r2, larg * 1.6) + 'Z');
        else if (tipo === 4) s += P('M' + px(r1, 0) + 'C' + px(r1 + passo * 0.6, larg * 1.6) + ' ' + px(r2, larg * 0.6) + ' ' + px(r2 - 2, 0) + 'C' + px(r2, -larg * 0.6) + ' ' + px(r1 + passo * 0.6, -larg * 1.6) + ' ' + px(r1, 0) + 'Z') + S.c(200 + ca * (r1 + passo * 0.55), 200 + sa * (r1 + passo * 0.55), Math.min(larg * 0.35, passo * 0.15));
        else s += S.ln(200 + ca * r1, 200 + sa * r1, 200 + ca * r2, 200 + sa * r2);
      }
    }
    var rc0 = R - aneis * passo;
    s += c(200, 200, rc0 + 2);
    s += nivel === 1 ? S.flor(200, 200, rc0 * 0.45, 6) : S.star(200, 200, rc0 * 0.8, rc0 * 0.4, sim / 2 > 4 ? sim / 2 : 5);
    return s;
  }
  for (var m = 0; m < 48; m++) (function (m) {
    var nivel = m < 14 ? 1 : m < 32 ? 2 : 3;
    F.add({ id: 'mandala-' + (m + 1), nome: 'Mandala ' + (m + 1), cat: 'mandalas', nivel: nivel, d: function () { return mandala(1000 + m * 37, nivel); } });
  })(m);

  /* ============ PADRÕES ============ */
  var tiposPadrao = [
    ['quadrados', function (t) { var s = ''; for (var y = 0; y < 400; y += t) for (var x = 0; x < 400; x += t) s += rc(x, y, t, t); return s; }],
    ['triangulos', function (t) { var s = '', h = t * 0.866; for (var j = -1; j * h < 400; j++) for (var i = -1; i * t < 420; i++) { var x = i * t + (j % 2 ? t / 2 : 0), y = j * h; s += pg([x, y + h, x + t / 2, y, x + t, y + h]) + pg([x + t / 2, y, x + t * 1.5, y, x + t, y + h]); } return s; }],
    ['favo', function (t) { var s = '', r = t / 2, w = r * 1.732; for (var j = -1; j * r * 1.5 < 420; j++) for (var i = -1; i * w < 420; i++) s += S.reg(i * w + (j % 2 ? w / 2 : 0), j * r * 1.5, r, 6); return s; }],
    ['circulos', function (t) { var s = ''; for (var y = 0; y <= 420; y += t) for (var x = 0; x <= 420; x += t) s += c(x, y, t * 0.5) + c(x, y, t * 0.25); return s; }],
    ['escamas', function (t) { var s = ''; for (var j = 0; j * t / 2 < 440; j++) for (var i = -1; i * t < 420; i++) { var x = i * t + (j % 2 ? t / 2 : 0), y = j * t / 2; s += P('M' + n(x - t / 2) + ' ' + n(y) + 'A' + n(t / 2) + ' ' + n(t / 2) + ' 0 0 0 ' + n(x + t / 2) + ' ' + n(y) + 'Z'); } return s; }],
    ['ondas', function (t) { var s = ''; for (var y = -t; y < 420; y += t / 1.5) { var d = 'M-20 ' + n(y); for (var x = -20; x < 420; x += t) d += 'q' + n(t / 2) + ' ' + n(-t / 3) + ' ' + n(t) + ' 0'; s += L(d); } return s; }],
    ['coracoes', function (t) { var s = ''; for (var j = 0; j * t < 420; j++) for (var i = 0; i * t < 420; i++) s += S.heart(i * t + (j % 2 ? t / 2 : 0), j * t + t / 2, t * 0.95); return s; }],
    ['estrelas', function (t) { var s = ''; for (var j = 0; j * t < 420; j++) for (var i = 0; i * t < 420; i++) s += S.star(i * t + (j % 2 ? t / 2 : 0), j * t + t / 2, t * 0.48, t * 0.2); return s; }],
    ['losangos', function (t) { var s = ''; for (var j = -1; j * t / 2 < 420; j++) for (var i = -1; i * t < 420; i++) { var x = i * t + (j % 2 ? t / 2 : 0), y = j * t / 2; s += pg([x, y - t / 2, x + t / 2, y, x, y + t / 2, x - t / 2, y]); } return s; }],
    ['tijolos', function (t) { var s = '', h = t / 2; for (var j = 0; j * h < 420; j++) for (var i = -1; i * t < 420; i++) s += rc(i * t + (j % 2 ? t / 2 : 0), j * h, t, h); return s; }]
  ];
  var nomesPadrao = { quadrados: 'Quadrados', triangulos: 'Triângulos', favo: 'Favo de mel', circulos: 'Círculos', escamas: 'Escamas', ondas: 'Ondas', coracoes: 'Corações', estrelas: 'Estrelas', losangos: 'Losangos', tijolos: 'Tijolos' };
  var tamanhos = { 1: 100, 2: 66, 3: 44 };
  [1, 2, 3].forEach(function (nv) {
    tiposPadrao.forEach(function (tp) {
      F.add({ id: 'padrao-' + tp[0] + '-' + nv, nome: 'Padrão: ' + nomesPadrao[tp[0]], cat: 'padroes', nivel: nv, d: function () {
        var id = 'cp' + tp[0] + nv;
        return '<defs><clipPath id="' + id + '"><rect x="15" y="15" width="370" height="370" rx="30"/></clipPath></defs>' +
          '<g clip-path="url(#' + id + ')">' + tp[1](tamanhos[nv]) + '</g>' + rc(15, 15, 370, 370, 30, ' fill="none"');
      } });
    });
  });

  /* ============ ROBÔS ============ */
  function robo(seed, nivel) {
    var r = F.rng(seed), q = function (k) { return Math.floor(r() * k); };
    var s = '', cab = q(4), olho = q(4), boca = q(3), ant = q(3), corpo = q(3), peito = q(4), pernas = q(3), bracos = q(2);
    // antena
    if (ant === 0) s += ln(200, 70, 200, 35) + c(200, 28, 13);
    else if (ant === 1) s += ln(165, 70, 145, 30) + ln(235, 70, 255, 30) + c(145, 25, 10) + c(255, 25, 10);
    else s += pg([195, 70, 215, 45, 200, 48, 212, 20, 188, 50, 203, 47]);
    // pernas
    if (pernas === 0) s += rc(140, 320, 40, 50, 6) + rc(220, 320, 40, 50, 6) + rc(125, 360, 65, 22, 10) + rc(210, 360, 65, 22, 10);
    else if (pernas === 1) s += rc(150, 315, 100, 30) + c(150, 355, 28) + c(250, 355, 28) + c(150, 355, 10) + c(250, 355, 10);
    else s += rc(110, 330, 180, 50, 25) + c(140, 355, 15) + c(200, 355, 15) + c(260, 355, 15);
    // braços
    if (bracos === 0) s += rc(55, 210, 60, 26, 13) + rc(285, 210, 60, 26, 13) + c(52, 223, 20) + c(348, 223, 20);
    else s += L('M110 220Q70 240 70 280M290 220Q330 240 330 280') + P('M55 285L70 280L85 285L80 305L70 295L60 305Z') + P('M315 285L330 280L345 285L340 305L330 295L320 305Z');
    // corpo
    s += corpo === 0 ? rc(105, 190, 190, 135, 12) : corpo === 1 ? rc(100, 190, 200, 135, 40) : P('M95 190L305 190L280 325L120 325Z');
    if (peito === 0) s += c(200, 255, 35) + S.heart(200, 255, 40);
    else if (peito === 1) s += rc(140, 215, 120, 70, 8) + L('M150 250l20 -20l15 30l20 -35l15 25l20 -10', 0.8);
    else if (peito === 2) s += c(150, 230, 13) + c(200, 230, 13) + c(250, 230, 13) + rc(140, 260, 120, 40, 8);
    else s += S.star(200, 257, 45, 20);
    // pescoço e cabeça
    s += rc(175, 170, 50, 25);
    if (cab === 0) s += rc(115, 70, 170, 110, 14);
    else if (cab === 1) s += rc(110, 70, 180, 110, 50);
    else if (cab === 2) s += P('M115 180L115 120Q115 60 200 60Q285 60 285 120L285 180Z');
    else s += P('M130 70L270 70L290 180L110 180Z');
    s += rc(98, 105, 20, 40, 6) + rc(282, 105, 20, 40, 6);
    if (olho === 0) s += eye(165, 115, 20) + eye(235, 115, 20);
    else if (olho === 1) s += rc(140, 98, 45, 35, 6) + rc(215, 98, 45, 35, 6) + rc(155, 108, 15, 15, 2, PRETO) + rc(230, 108, 15, 15, 2, PRETO);
    else if (olho === 2) s += rc(140, 100, 120, 35, 17) + c(175, 117, 9, PRETO) + c(225, 117, 9, PRETO);
    else s += c(200, 115, 30) + c(200, 115, 14, PRETO);
    if (boca === 0) s += rc(155, 148, 90, 20, 6) + L('M178 148v20M200 148v20M222 148v20', 0.7);
    else if (boca === 1) s += smile(200, 150, 30, 8);
    else s += rc(165, 150, 70, 12, 6);
    if (nivel >= 2) s += c(120, 205, 5) + c(280, 205, 5) + c(120, 310, 5) + c(280, 310, 5) + ln(105, 330, 295, 330, 0.5);
    if (nivel === 3) s += S.star(55, 60, 25, 10) + S.star(345, 60, 18, 8) + c(355, 140, 15) + S.c(45, 140, 10) + L('M330 360l20 -20M340 380l30 -30', 0.6);
    return s;
  }
  for (var b = 0; b < 30; b++) (function (b) {
    var nv = b < 10 ? 1 : b < 20 ? 2 : 3;
    F.add({ id: 'robo-' + (b + 1), nome: 'Robô ' + (b + 1), cat: 'robos', nivel: nv, d: function () { return robo(500 + b * 91, nv); } });
  })(b);

  /* ============ MONSTRINHOS ============ */
  function curvaFechada(pts) {
    // Catmull-Rom fechado -> Bézier
    var d = 'M' + n(pts[0][0]) + ' ' + n(pts[0][1]), N = pts.length;
    for (var i = 0; i < N; i++) {
      var p0 = pts[(i - 1 + N) % N], p1 = pts[i], p2 = pts[(i + 1) % N], p3 = pts[(i + 2) % N];
      d += 'C' + n(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + n(p1[1] + (p2[1] - p0[1]) / 6) + ' ' + n(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + n(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + n(p2[0]) + ' ' + n(p2[1]);
    }
    return d + 'Z';
  }
  function monstro(seed, nivel) {
    var r = F.rng(seed), q = function (k) { return Math.floor(r() * k); };
    var s = '', pts = [], N = 9 + q(4), R0 = 125;
    for (var i = 0; i < N; i++) {
      var a = (i / N) * PI * 2 - PI / 2, rr = R0 * (0.82 + r() * 0.3);
      pts.push([200 + Math.cos(a) * rr * 1.05, 215 + Math.sin(a) * rr * (a > 0 && a < PI ? 0.95 : 1)]);
    }
    var chifre = q(3), nolhos = 1 + q(3), pernas = q(2);
    // pés
    s += pernas ? el(150, 345, 38, 22) + el(250, 345, 38, 22) : rc(140, 320, 30, 55, 12) + rc(230, 320, 30, 55, 12);
    // braços
    s += el(85, 240, 22, 50, 30) + el(315, 240, 22, 50, -30);
    // chifres
    if (chifre === 0) s += pg([140, 120, 120, 40, 175, 105]) + pg([260, 120, 280, 40, 225, 105]);
    else if (chifre === 1) s += ln(200, 100, 200, 45) + c(200, 40, 14);
    else s += P('M150 110Q120 60 150 40Q150 80 175 100Z') + P('M250 110Q280 60 250 40Q250 80 225 100Z');
    s += P(curvaFechada(pts));
    // olhos
    var ys = 175;
    if (nolhos === 1) s += c(200, ys, 45) + eye(200, ys, 30, 0, 4);
    else if (nolhos === 2) s += eye(160, ys, 26, 2, 3) + eye(240, ys, 26, -2, 3);
    else s += eye(150, ys + 8, 20) + eye(200, ys - 20, 24) + eye(250, ys + 8, 20);
    // boca
    var bt = q(3);
    if (bt === 0) s += P('M140 240Q200 300 260 240Z') + pg([160, 248, 172, 268, 184, 250]) + pg([216, 250, 228, 268, 240, 248]);
    else if (bt === 1) s += smile(200, 245, 40, 14) + P('M190 258q10 18 20 0z');
    else s += el(200, 255, 30, 22) + el(200, 265, 16, 9);
    if (nivel >= 2) { var nm = 3 + q(4); for (var j = 0; j < nm; j++) s += c(140 + r() * 120, 285 + r() * 25, 6 + r() * 8); }
    if (nivel === 3) s += S.star(50, 60, 25, 10) + S.star(350, 80, 20, 8) + c(60, 330, 18) + c(350, 320, 12) + S.heart(340, 190, 40) + S.heart(55, 180, 35);
    return s;
  }
  for (var mo = 0; mo < 24; mo++) (function (mo) {
    var nv = mo < 8 ? 1 : mo < 16 ? 2 : 3;
    F.add({ id: 'monstro-' + (mo + 1), nome: 'Monstrinho ' + (mo + 1), cat: 'monstros', nivel: nv, d: function () { return monstro(77 + mo * 53, nv); } });
  })(mo);

  /* ============ ROSTOS (diversidade) ============ */
  var cabelos = [
    ['curto', function () { return P('M110 175Q100 70 200 65Q300 70 290 175Q280 120 200 115Q120 120 110 175Z'); }],
    ['cacheado', function () { var s = ''; for (var i = 0; i < 13; i++) { var a = PI + (i / 12) * PI; s += c(200 + Math.cos(a) * 100, 175 + Math.sin(a) * 105, 32); } return s; }],
    ['blackpower', function () { var s = ''; for (var i = 0; i < 16; i++) { var a = (i / 16) * PI * 2; s += c(200 + Math.cos(a) * 125, 175 + Math.sin(a) * 120, 42); } return s + c(200, 175, 130); }],
    ['trancas', function () { var s = ''; [95, 305].forEach(function (x) { for (var j = 0; j < 5; j++) s += el(x, 200 + j * 32, 18, 20); s += P('M' + (x - 12) + ' 360l12 25l12 -25z'); }); return s + P('M100 190Q95 70 200 65Q305 70 300 190Q280 115 200 112Q120 115 100 190Z'); }],
    ['rabo', function () { return P('M290 130Q360 140 350 260Q340 300 320 300Q335 230 285 170Z') + c(292, 140, 14) + P('M105 190Q95 70 200 65Q305 70 295 190Q275 110 200 110Q125 110 105 190Z'); }],
    ['longo', function () { return P('M90 330Q70 70 200 65Q330 70 310 330L270 330Q290 200 270 150Q200 130 130 150Q110 200 130 330Z'); }],
    ['coque', function () { return c(200, 55, 38) + P('M105 185Q95 75 200 72Q305 75 295 185Q280 115 200 112Q120 115 105 185Z'); }],
    ['bone', function () { return P('M100 160Q100 70 200 70Q300 70 300 160Z') + P('M290 150Q370 150 370 170L290 170Z') + c(200, 72, 10); }],
    ['lenco', function () { return P('M80 350Q60 80 200 60Q340 80 320 350Q300 280 290 200Q280 110 200 105Q120 110 110 200Q100 280 80 350Z'); }],
    ['franja', function () { return P('M100 220Q90 70 200 65Q310 70 300 220Q295 150 270 130Q240 160 200 140Q160 160 130 130Q105 150 100 220Z'); }],
    ['espetado', function () { return pg([110, 160, 105, 90, 140, 115, 150, 60, 180, 105, 200, 45, 220, 105, 250, 60, 260, 115, 295, 90, 290, 160, 200, 120]); }],
    ['chiquinhas', function () { return c(85, 140, 40) + c(315, 140, 40) + c(115, 145, 10) + c(285, 145, 10) + P('M105 185Q95 75 200 70Q305 75 295 185Q280 115 200 112Q120 115 105 185Z'); }]
  ];
  function rosto(i) {
    var cab = cabelos[i % cabelos.length], oculos = i % 5 === 2, sardas = i % 4 === 1, s = '';
    s += P('M60 400Q70 310 200 300Q330 310 340 400Z') + P('M165 300L200 340L235 300Z');
    if (cab[0] === 'longo' || cab[0] === 'trancas' || cab[0] === 'lenco' || cab[0] === 'blackpower' || cab[0] === 'cacheado') s += cab[1]();
    s += rc(175, 260, 50, 45, 10) + c(105, 205, 20) + c(295, 205, 20) + el(200, 195, 95, 105);
    if (!(cab[0] === 'longo' || cab[0] === 'trancas' || cab[0] === 'lenco' || cab[0] === 'blackpower' || cab[0] === 'cacheado')) s += cab[1]();
    else if (cab[0] === 'blackpower' || cab[0] === 'cacheado') s += P('M110 165Q120 110 200 105Q280 110 290 165Q250 140 200 140Q150 140 110 165Z');
    else if (cab[0] === 'longo') s += P('M110 170Q120 105 200 100Q280 105 290 170Q240 130 200 135Q160 130 110 170Z');
    s += eye(165, 195, 13) + eye(235, 195, 13) + L('M150 170q15 -8 30 0M220 170q15 -8 30 0', 0.8) + L('M200 205q-8 25 5 28', 0.8) + smile(200, 250, 30, 10);
    if (oculos) s += c(165, 195, 28, ' fill="none"') + c(235, 195, 28, ' fill="none"') + ln(193, 195, 207, 195);
    if (sardas) s += dot(145, 228, 2.5) + dot(155, 236, 2.5) + dot(255, 228, 2.5) + dot(245, 236, 2.5);
    return s;
  }
  for (var ro = 0; ro < 16; ro++) (function (ro) {
    F.add({ id: 'rosto-' + (ro + 1), nome: 'Criança ' + (ro + 1), cat: 'pessoas', nivel: ro < 12 ? 1 : 2, d: function () {
      return ro < 12 ? rosto(ro) : rc(15, 15, 370, 370, 20) + S.T(0, 0, 1, function () { return rosto(ro) + S.star(50, 60, 22, 9) + S.star(350, 60, 22, 9) + S.heart(50, 330, 40) + S.heart(350, 330, 40); });
    } });
  })(ro);
  F.add({ id: 'autorretrato', nome: 'Meu rosto', cat: 'pessoas', nivel: 1, d: function () {
    return rc(30, 30, 340, 340, 20) + rc(50, 50, 300, 300, 10) + P('M90 350Q100 280 200 270Q300 280 310 350Z') + rc(178, 240, 44, 40, 10) + el(200, 170, 75, 90);
  } });

  /* ============ CENAS (composições) ============ */
  var cenas = [
    ['Fazenda', 'fazenda', [['vaca', 20, 150, 0.42], ['porco', 220, 175, 0.38], ['galinha', 150, 250, 0.33]]],
    ['Fundo do mar', 'mar', [['baleia', 10, 30, 0.5], ['peixe', 210, 150, 0.4], ['polvo', 60, 200, 0.4], ['peixe', 230, 270, 0.25]]],
    ['Jardim', 'jardim', [['borboleta', 30, 40, 0.35], ['abelha', 240, 60, 0.32], ['flor', 140, 160, 0.42], ['caracol', 240, 250, 0.3], ['joaninha', 40, 260, 0.25]]],
    ['No espaço', 'espaco', [['foguete', 140, 70, 0.55], ['robo', 260, 210, 0.3], ['estrela', 20, 180, 0.28]]],
    ['Na cidade', 'cidade', [['onibus', 80, 230, 0.42], ['carro', 230, 280, 0.3], ['nuvem', 230, 10, 0.3]]],
    ['Na floresta', 'floresta', [['macaco', 70, 60, 0.32], ['tucano', 220, 80, 0.38], ['leao', 120, 210, 0.38]]],
    ['Na praia', 'praia', [['tartaruga', 30, 260, 0.33], ['barco', 230, 120, 0.35], ['sorvete', 160, 210, 0.3], ['capivara', 250, 270, 0.3]]],
    ['Festa', 'sala', [['bolo', 110, 150, 0.45], ['baloes', 10, 120, 0.35], ['presente', 280, 230, 0.25], ['presente', 20, 250, 0.22]]],
    ['Sala de tecnologia', 'sala', [['computador', 20, 160, 0.42], ['tablet', 210, 170, 0.3], ['robo', 290, 180, 0.28], ['lampada', 170, 20, 0.25]]],
    ['Piquenique', 'parque', [['cesta', 0, 0, 0], ['maca', 100, 250, 0.2], ['banana', 150, 250, 0.2], ['uva', 200, 245, 0.2], ['melancia', 260, 260, 0.22], ['cachorro', 60, 150, 0.33]]],
    ['Brincadeiras', 'parque', [['pipa', 140, 10, 0.35], ['bola', 70, 250, 0.25], ['piao', 200, 250, 0.25], ['peteca', 280, 210, 0.27]]],
    ['Noite estrelada', 'noite', [['coruja', 60, 150, 0.45], ['lua', 210, 140, 0.35], ['casa', 220, 220, 0.35]]],
    ['Dinossauros', 'floresta', [['dinossauro', 40, 120, 0.55], ['dinossauro', 230, 210, 0.35], ['cogumelo', 150, 290, 0.2]]],
    ['Na estrada', 'estrada', [['caminhao', 20, 200, 0.42], ['moto', 230, 250, 0.33], ['aviao', 180, 30, 0.38]]],
    ['Lago', 'jardim', [['pato', 30, 170, 0.45], ['sapo', 230, 220, 0.32], ['arvore', 240, 40, 0.38]]],
    ['Selva brasileira', 'floresta', [['arara', 60, 70, 0.38], ['preguica', 210, 30, 0.38], ['jacare', 80, 260, 0.45]]],
    ['Estação de trem', 'estrada', [['trem', 30, 150, 0.6], ['balao', 260, 10, 0.3]]],
    ['Céu de verão', 'ceu', [['balao', 40, 70, 0.4], ['passarinho', 220, 180, 0.3], ['aviao', 200, 40, 0.35], ['arcoiris', 120, 230, 0.4]]],
    ['Hora do lanche', 'mesa', [['pizza', 30, 140, 0.4], ['xicara', 190, 170, 0.35], ['queijo', 250, 160, 0.3], ['morango', 140, 190, 0.25]]],
    ['Música', 'sala', [['violao', 40, 120, 0.55], ['fone', 210, 160, 0.4], ['urso', 260, 220, 0.25]]]
  ];
  cenas.forEach(function (ce, i) {
    F.add({ id: 'cena-' + (i + 1), nome: ce[0], cat: 'cenas', nivel: 3, d: function () {
      var s = F.cenario[ce[1]]();
      ce[2].forEach(function (it) { if (F.porId[it[0]]) s += S.T(it[1], it[2], it[3], function () { return F.miolo(it[0]); }); });
      return s;
    } });
  });
})();
