using System.IO;
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace TogglerApi.RabbitMQ
{

    /// <summary>
    /// Message to send
    /// </summary>
    public interface IMessage
    {

        /// <summary>
        /// The toggle key that is altered
        /// </summary>
        /// <value></value>
        string ToggleKey { get; set; }

        /// <summary>
        /// Teh serviceToggle Value
        /// </summary>
        /// <value></value>
        bool Value { get; set; }

    }
}