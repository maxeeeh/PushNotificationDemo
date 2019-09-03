using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PushNotificationDemo.Models
{
    public class NotificationMessage
    {
        [JsonProperty(PropertyName = "token")]
        public string Token { get; set; }

        [JsonProperty(PropertyName = "message")]
        public string Message { get; set; }
    }
}