using System;
using System.Collections.Generic;
using TogglerApi.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TogglerApi.Models.Toggle
{
    public class Service : ITrackable
    {
        /// <summary>
        /// Identifier
        /// </summary>
        /// <value></value>
        public long Id { get; set; }

        /// <summary>
        /// Service Identifier
        /// </summary>
        /// <value></value>
        public string Key { get; set; }

        /// <summary>
        /// Service Description
        /// </summary>
        /// <value></value>
        public string Description { get; set; }

        /// <summary>
        /// When was created
        /// </summary>
        /// <value></value>
        public DateTime? CreatedAt { get; set; }
        /// <summary>
        /// When was updated
        /// </summary>
        /// <value></value>
        public DateTime? UpdatedAt { get; set; }

        /// <summary>
        /// Toggles states related to a given service
        /// </summary>
        /// <returns></returns>
        public List<ToggleState> States { get; set; } = new List<ToggleState>();

    }
}