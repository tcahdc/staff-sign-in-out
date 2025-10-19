// cache bump to v6
const CACHE = "signio-cache-v6";
const ASSETS = ["./","./index.html","./manifest.webmanifest","./icon-192.png"];
self.addEventListener("install", (e)=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener("activate", (e)=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", (e)=>{
  e.respondWith(
    caches.match(e.request).then(res=> res || fetch(e.request).then(r=>{
      const copy = r.clone();
      caches.open(CACHE).then(c=> c.put(e.request, copy)).catch(()=>{});
      return r;
    }).catch(()=> caches.match("./index.html")))
  );
});
