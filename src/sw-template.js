if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js',
  );

  if (workbox) {
    workbox.precaching.precacheAndRoute([]);

    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    workbox.routing.registerRoute(
      /\.(?:png)$/,
      new workbox.strategies.CacheFirst({
        cacheName: 'images-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          }),
        ],
      }),
    );
  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}
