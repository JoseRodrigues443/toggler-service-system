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
        /// The toggle key that is altered
        /// </summary>
        /// <value></value>
        string ServiceKey { get; set; }

        /// <summary>
        /// the serviceToggle Value
        /// </summary>
        /// <value></value>
        bool? Value { get; set; }

        
        /// <summary>
        /// Is this a start message for a given service
        /// </summary>
        /// <value></value>
        bool? IsStartMessage { get; set; }

    }
}