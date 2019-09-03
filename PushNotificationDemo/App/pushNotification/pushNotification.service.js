(function () {
    angular
        .module('app.pushNotification')
        .factory('pushNotificationService', pushNotificationService);

    pushNotificationService.$inject = [
        '$http',
        '$q'
    ];

    function pushNotificationService($http, $q) {
        var service = {
            sendMessage: _sendMessage
        };

        function _sendMessage(notificationMessage) {
            return $http.post("/api/pushNotification/send-message-payload", notificationMessage)
                .then(function (data) {
                    return data;
                })
                .catch(function (error) {
                    return $q.reject(error);
                });
        }

        return service;
    }
}());