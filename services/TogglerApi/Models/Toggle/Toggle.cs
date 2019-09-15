using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TogglerApi.Models.Toggle
{
    public class Toggle : IToggle, ITrackable
    {
        /// <summary>
        /// Identifier
        /// </summary>
        /// <value></value>
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
        /// Toggles states related to a given service
        /// </summary>
        /// <returns></returns>
        public List<ToggleState> States { get; set; } = new List<ToggleState>();


    }
}