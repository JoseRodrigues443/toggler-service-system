using System;

namespace TogglerApi.Models.Toggle
{
    public class Toggle : IToggle, ITrackable
    {
        /// <summary>
        /// Identifier
        /// </summary>
        /// <value></value>
        public long Id { get; set; }

        /// <summary>
        /// Toggle Identifier
        /// </summary>
        /// <value></value>
        public string Key { get; set; }

        /// <summary>
        /// Toggle Description
        /// </summary>
        /// <value></value>
        public string Description { get; set; }

        /// <summary>
        /// The toggle current value
        /// </summary>
        /// <value></value>
        public bool Value { get; set; }

        /// <summary>
        /// When was created
        /// </summary>
        /// <value></value>
        public DateTime CreatedAt { get; set; }
        /// <summary>
        /// When was updated
        /// </summary>
        /// <value></value>
        public DateTime UpdatedAt { get; set; }


    }
}