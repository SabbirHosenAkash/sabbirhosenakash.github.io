const cacheName = 'writarion-v1';
const assets = ['/', '/index.html', '/style.css', '/script.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(assets)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});


const cacheName = 'writarion-v1';
// এখানে আপনার সাইটের সব গুরুত্বপূর্ণ ফাইলের নাম দিন
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/sabbir.png',
  '/favicon-32x32.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png'
];

// ১. ফাইলগুলো ক্যাশ মেমোরিতে সেভ করা (Installation)
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Caching all assets');
      return cache.addAll(assets);
    })
  );
});

// ২. অফলাইনে থাকাকালীন ক্যাশ থেকে ফাইল দেখানো (Fetching)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // যদি ক্যাশ-এ ফাইল থাকে তবে সেটি দেখাবে, নাহলে নেটওয়ার্ক থেকে আনবে
      return cachedResponse || fetch(e.request);
    })
  );
});

// ৩. পুরনো ক্যাশ ডিলিট করা (Activation)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      );
    })
  );
});
