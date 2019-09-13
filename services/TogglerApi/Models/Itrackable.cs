using System;

namespace TogglerApi.Models
{
    public interface ITrackable
    {
        /// <summary>
        /// When was the instance created
        /// </summary>
        /// <value></value>
        DateTime CreatedAt { get; set; }
        /// <summary>
        /// When was the instance updated
        /// </summary>
        /// <value></value>
        DateTime UpdatedAt { get; set; }
    }
}
