using System;
using System.Collections.Generic;

namespace TogglerApi.Models.Toggle
{
    public class ToggleState : ITrackable
    {
        /// <summary>
        /// Identifier
        /// </summary>
        /// <value></value>
        public long Id { get; set; }

        /// <summary>
        /// The toggle value for a given service
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

        /// <summary>
        /// The related Toggle
        /// </summary>
        /// <value></value>
        public Toggle Toggle { get; set; }

        /// <summary>
        /// The related Service
        /// </summary>
        /// <value></value>
        public Service Service { get; set; }


    }
}