using System;
using System.Collections.Generic;
using TogglerApi.Models;

namespace TogglerApi.Models.Toggle
{
    public class Feature : ITrackable
    {
        /// <summary>
        /// Identifier
        /// </summary>
        /// <value></value>
        public long Id { get; set; }

        /// <summary>
        /// Feature Identifier
        /// </summary>
        /// <value></value>
        public string Key { get; set; }

        /// <summary>
        /// Feature Description
        /// </summary>
        /// <value></value>
        public string Description { get; set; }

        /// <summary>
        /// Toggles related to a given featureF
        /// </summary>
        /// <typeparam name="Toggle"></typeparam>
        /// <returns></returns>
        public List<Toggle> Toggles { get; set; } = new List<Toggle>();



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