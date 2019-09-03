(function () {
    angular
        .module('app.pushNotification')
        .controller('PushNotificationController', PushNotificationController);

    PushNotificationController.$inject = [
        '$scope',
        'pushNotificationService',
        'firebase',
        'notification'
    ];

    function PushNotificationController($scope, pushNotificationService, firebase, notification) {
        var vm = this;

        init();

        vm.sendMessage = sendMessage;
        vm.openNotifications = openNotifications;
        vm.notificationClicked = notificationClicked;
        vm.copyToClipboard = copyToClipboard;

        function sendMessage(to, message) {
            var notificationMessage = {
                token: to,
                message: message
            };

            return pushNotificationService.sendMessage(notificationMessage)
                .then(function (data) {
                    return data;
                })
                .catch(function (error) {
                    return error;
                });
        }

        function openNotifications() {
            vm.unViewedNotificationCount = 0;
        }

        function notificationClicked(notification) {
            vm.notifications = $.grep(vm.notifications, function (value) {
                if (value.id !== notification.id)
                    return value;
            });
        }

        function copyToClipboard(text) {
            return navigator.clipboard.writeText(text);
        }

        function init() {
            const messaging = firebase.messaging();

            vm.notificationCount = 0;
            vm.unViewedNotificationCount = 0;
            vm.notifications = [];

            if ('Notification' in window && 'serviceWorker' in navigator) {
                navigator.serviceWorker.register('/App/pushNotification/pushNotification.serviceWorker.js')
                    .then(registration => {
                        messaging.useServiceWorker(registration);

                        messaging.onTokenRefresh(() => {
                            messaging.getToken().then((refreshedToken) => {
                                $scope.$apply(function () {
                                    vm.token = refreshedToken;

                                    return refreshedToken;
                                });
                            }).catch((error) => {
                                return error;
                            });
                        });

                        messaging.onMessage((payload) => {
                            $scope.$apply(function () {
                                if (payload.notification) {
                                    vm.notificationCount = vm.notificationCount + 1;
                                    vm.unViewedNotificationCount = vm.unViewedNotificationCount + 1;

                                    vm.notifications.push({ id: vm.notificationCount, message: payload.notification.body });
                                }
                                else if (payload.data) {
                                    vm.notificationCount = vm.notificationCount + 1;
                                    vm.unViewedNotificationCount = vm.unViewedNotificationCount + 1;

                                    vm.notifications.push({ id: vm.notificationCount, message: payload.data.body });
                                }
                            });
                        });

                        return getToken();
                    })
                    .catch(error => {
                        console.error('Registration failed:', error);
                    });
            }

            function getToken() {
                return messaging.getToken()
                    .then((currentToken) => {
                        if (currentToken) {
                            $scope.$apply(function () {
                                vm.token = currentToken;

                                return currentToken;
                            });
                        } else {
                            return subscribeUser();
                        }
                    })
                    .catch((error) => {
                        setTokenSentToServer(false);

                        return error;
                    });
            }

            function subscribeUser() {
                notification.requestPermission().then(function (permission) {
                    if (permission === "granted") {
                        return getToken();
                    }
                });
            }
        }
    }
}());