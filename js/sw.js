const CACHE_NAME = 'woody-text-tool-v1';
const ASSETS_TO_CACHE = [
  '/js/libs/html2canvas.min.js',
  // می‌توانید فایل‌های مهم دیگری را هم اینجا لیست کنید
];

// نصب (install): فایل‌های کلیدی را در کش قرار می‌دهیم
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// فعال‌سازی (activate):‌ کش‌های قدیمی‌تر را پاک می‌کنیم
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});

// واکشی (fetch): اول از کش بخوان، اگه نبود برو سراغ شبکه
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // فقط درخواست‌های GET و همان فایل موردنظر را هندل کنیم
  if (
    request.method === 'GET' &&
    request.url.endsWith('/js/html2canvas.min.js')
  ) {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached
          ? cached
          : fetch(request).then((response) => {
              // نسخهٔ تازه را در پس‌زمینه ذخیره کن
              const respClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, respClone));
              return response;
            })
      )
    );
  }
});
