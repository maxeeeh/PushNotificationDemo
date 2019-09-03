(function () {
    angular
        .module('app.pushNotification')
        .config(configure);

    configure.$inject = [
        'firebase'
    ];

    function configure(firebase) {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            var firebaseConfig = {
                apiKey: "AIzaSyABw07ib6-pfw2ilbCDtqXLYdFdtiHlW88",
                authDomain: "pushnotificationdemo-251401.firebaseapp.com",
                databaseURL: "https://pushnotificationdemo-251401.firebaseio.com",
                projectId: "pushnotificationdemo-251401",
                storageBucket: "",
                messagingSenderId: "393528136435",
                appId: "1:393528136435:web:dbff1f4e0e609030"
            };

            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);

            firebase.messaging().usePublicVapidKey("BAPVGfsi0hC4bOjNIfo8fLHxHgdt0acw930bw9rwuQwDM7TlTFJHyDCSoPGYn6MyTNQz8jn2pnIifk36pRCADjM");
        }
    }
}());