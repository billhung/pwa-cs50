importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

console.log('my code');

workbox.precaching.precacheAndRoute([{"revision":"39a4581132d3cf1fcfc301abef6fe794","url":"css/main.css"},{"revision":"c3bc5c6e1e844be9eda28c60e9d6e875","url":"index.html"},{"revision":"f96ed96eac6cc3742bf53e680159c3ed","url":"js/app.js"},{"revision":"5cc5196c17947dea95ff53d4b0264d2c","url":"workbox-3ff92774.js"}]);