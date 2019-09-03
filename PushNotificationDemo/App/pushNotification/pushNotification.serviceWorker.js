// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/6.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
var firebaseConfig = {
    messagingSenderId: "393528136435"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(self.clients.openWindow("https://google.com"));
});

//self.addEventListener('notificationclose', function (event) {
//    event.notification.close();
//    event.waitUntil(self.clients.openWindow("https://google.com"));
//});

//self.addEventListener('install', event => {
//    self.skipWaiting();

//    console.log('Service worker installing...');
//});

//self.addEventListener('activate', event => {
//    console.log('Service worker activating...');
//});