using System.IO;
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace TogglerApi.RabbitMQ
{
    public class RabbitListener
    {
        /// <summary>
        /// Connection Factory
        /// </summary>
        /// <value></value>
        ConnectionFactory factory { get; set; }
        /// <summary>
        /// Connection
        /// </summary>
        /// <value></value>
        IConnection connection { get; set; }
        /// <summary>
        /// Channel
        /// </summary>
        /// <value></value>
        IModel channel { get; set; }

        /// <summary>
        /// Register to queue
        /// </summary>
        /// <param name="queue"></param>
        /// <param name="logFilePath"></param>
        public void Register(string queue = "app_toggles", string logFilePath = "./logs.txt")
        {
            channel.QueueDeclare(queue: queue, durable: false, exclusive: false, autoDelete: false, arguments: null);
            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body;
                var message = Encoding.UTF8.GetString(body);
                File.AppendAllText(logFilePath, message + "\n");
            };
            channel.BasicConsume(queue: queue, autoAck: true, consumer: consumer);
        }

        /// <summary>
        /// Deregister
        /// </summary>
        public void Deregister()
        {
            this.connection.Close();
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="hostName"></param>
        public RabbitListener(string hostName = "localhost")
        {
            this.factory = new ConnectionFactory() { HostName = hostName };
            this.connection = factory.CreateConnection();
            this.channel = connection.CreateModel();
        }
    }
}
