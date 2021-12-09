importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

console.log('my code');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// <!--Credit & References-->
// <!--Bill Hung (@billhung), the original coder, © 2021-12-04 under BSD free software license-->
// <!--Ref:David Jordan's Pomodoro javascript tutorial article https://david-jordan.medium.com/coding-a-pomodoro-timer-in-html-js-css-61b5b89b5948-->
// <!--Ref:Gary Simon's PWA tutorial YouTube video https://youtu.be/PL2DG9LJoVQ?t=297-->
// <!--Google Workbox (PWA)-->