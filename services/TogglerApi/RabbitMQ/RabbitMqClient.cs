using System.IO;
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Newtonsoft.Json;

namespace TogglerApi.RabbitMQ
{

    public class RabbitMqClient
    {

        /// <summary>
        /// Publish
        /// /// </summary>
        /// <param name="message"></param>
        /// <param name="queue"></param>
        /// <param name="hostname"></param>
        public static void Publish(IMessage message, string queue = "app_toggles", string hostname = "localhost")
        {
            var factory = new ConnectionFactory() { HostName = hostname };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: queue,
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);

                var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));
                channel.BasicPublish(exchange: "",
                                     routingKey: queue,
                                     basicProperties: null,
                                     body: body);
            }
        }
    }

}