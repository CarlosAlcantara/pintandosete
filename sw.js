/* Funciona sem internet depois do primeiro acesso. Troque a VERSAO ao publicar mudanças. */
var VERSAO = 'p7-v2';
var ARQUIVOS = ['./', 'index.html', 'css/estilo.css', 'js/base.js', 'js/fig-animais.js', 'js/fig-objetos.js', 'js/fig-geradores.js',
  'js/icones.js', 'js/pintura.js', 'js/app.js', 'manifest.webmanifest', 'img/icone-192.png', 'img/icone-512.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSAO).then(function (c) { return c.addAll(ARQUIVOS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== VERSAO; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(function (r) {
    return r || fetch(e.request).then(function (resp) {
      if (resp.ok && new URL(e.request.url).origin === location.origin) {
        var copia = resp.clone(); caches.open(VERSAO).then(function (c) { c.put(e.request, copia); });
      }
      return resp;
    });
  }));
});
