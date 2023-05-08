/* global caches,self */
//self.importScripts('data/games.js');
// Files to cache V1.1.4
const version = "V1.1.4.42";

const cacheName = 'pbl_PWA_' + version;
const filesToCache = [
    '/',
    '/index.html',
    '/app/pbl.js',
    '/css/app.css',
    '/css/styles.css',
    '/css/ui.css',
    '/img/icons/icon-60-2x.png',
    '/img/icons/icon-72-2x.png',
    '/img/icons/icon-76-2x.png',
    '/img/icons/icon-192x192.png',
    '/img/icons/icon-256x256.png',
    '/img/icons/icon-512x512.png'
];
/*const gamesImages = [];
 for (let i = 0; i < games.length; i++) {
 gamesImages.push(`data/img/${games[i].slug}.jpg`);
 }
 const contentToCache = appShellFiles.concat(gamesImages);*/

// Installing Service Worker
self.addEventListener('install', (e) => {
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log("[ServiceWorker] - Use cache", cacheName);
        //await cache.addAll(filesToCache);
    })());
    // forces a service worker to activate immediately
    self.skipWaiting();
});

self.addEventListener("activate", e => {
    e.waitUntil((async () => {
        const keyList = await caches.keys();
        await Promise.all(
                keyList.map(key => {
                    console.log(key);
                    if (key !== cacheName) {
                        console.log("[ServiceWorker] - Removing old cache", key);
                        return caches.delete(key);
                    }
                })
                );
    })());
    e.waitUntil(self.clients.claim());
});


// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
    if (e.request.url.match(/version$/)) {
        // fix response without page
        e.respondWith(
                new Response(version, {
                    headers: {
                        'Content-Type': 'text/plain; charset=utf-8'
                    }
                })
                );
    } else if (e.request.method !== 'GET' || e.request.url.match(':6')){
        return;
    } else {
        e.respondWith((async () => {
            const r = await caches.match(e.request);
            console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
            if (r)
                return r;
            const response = await fetch(e.request);
            if (e.request.method === 'GET'){
                const cache = await caches.open(cacheName);
                console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
                cache.put(e.request, response.clone());
            }
            return response;
        })());
    }
});
