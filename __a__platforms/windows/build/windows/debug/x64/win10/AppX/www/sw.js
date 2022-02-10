//self.importScripts('data/games.js');

// Files to cache V1.1.4
const cacheName = 'pbl_PWA';
const appShellFiles = [
  '/',
  '/index.html',
  '/app/pbl.js',
  '/css/app.css',
  '/css/styles.css',
  '/css/ui.css',
  '/pwapp/fonts/graduate.eot',
  '/pwapp/fonts/graduate.ttf',
  '/pwapp/fonts/graduate.woff',
  '/pwapp/favicon.ico',
  '/pwapp/img/js13kgames.png',
  '/pwapp/img/bg.png',
  '/img/icons/icon-60-2x.png',
  '/img/icons/icon-72-2x.png',
  '/img/icons/icon-76-2x.png',
  '/img/icons/icon-192x192.png',
  '/img/icons/icon-256x256.png',
  '/img/icons/icon-512x512.png',
];
/*const gamesImages = [];
for (let i = 0; i < games.length; i++) {
  gamesImages.push(`data/img/${games[i].slug}.jpg`);
}
const contentToCache = appShellFiles.concat(gamesImages);*/

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  // The promise that skipWaiting() returns can be safely ignored.
  e.skipWaiting();
  e.waitUntil((async () => {
	caches.delete(cacheName);
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    //await cache.addAll(contentToCache);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
      // if(e.request.url = 'https://zv-datenbank.ad.drguth.de/longpoll
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});
