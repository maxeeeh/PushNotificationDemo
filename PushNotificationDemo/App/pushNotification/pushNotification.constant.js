(function () {
    angular
        .module('app.pushNotification')
        .constant('firebase', firebase);

    angular
        .module('app.pushNotification')
        .constant('notification', Notification);
}());