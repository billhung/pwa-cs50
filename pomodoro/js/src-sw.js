importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

console.log('my code');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);