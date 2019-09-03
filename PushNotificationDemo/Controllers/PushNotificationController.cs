using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using PushNotificationDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;

namespace PushNotificationDemo.Controllers
{
    [RoutePrefix("api/pushNotification")]
    public class PushNotificationController : ApiController
    {
        [HttpPost]
        [Route("send-message-notification")]
        public async Task<IHttpActionResult> SendMessageNotificationAsync(NotificationMessage notificationMessage)
        {
            string deviceToken = notificationMessage.Token;

            Message message = new Message()
            {
                Notification = new Notification()
                {
                    Title = "A new Notification!",
                    Body = notificationMessage.Message
                },
                Webpush = new WebpushConfig()
                {
                    FcmOptions = new WebpushFcmOptions()
                    {
                        Link = "https://stackoverflow.com"
                    }
                },
                Token = deviceToken
            };

            string response = string.Empty;

            try
            {
                response = await FirebaseMessaging.DefaultInstance.SendAsync(message);
            }
            catch (Exception e)
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e));
            }

            return Ok(response);
        }

        [HttpPost]
        [Route("send-message-payload")]
        public async Task<IHttpActionResult> SendMessagePayloadAsync(NotificationMessage notificationMessage)
        {
            string deviceToken = notificationMessage.Token;

            Message message = new Message()
            {
                Data = new Dictionary<string, string>
                {
                    { "title", "A new notification with payload!" },
                    { "body", notificationMessage.Message }
                },
                Token = deviceToken
            };

            string response = string.Empty;

            try
            {
                response = await FirebaseMessaging.DefaultInstance.SendAsync(message);
            }
            catch (Exception e)
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e));
            }

            return Ok(response);
        }
    }
}
