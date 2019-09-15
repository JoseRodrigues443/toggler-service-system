using TogglerApi.Models.Toggle;
using TogglerApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
namespace TogglerApi.Context
{
    public class ToggleStateContext : DbContext
    {
        public ToggleStateContext(DbContextOptions<ToggleStateContext> options)
            : base(options)
        {
        }

        /// <summary>
        /// Toggle states in system
        /// </summary>
        /// <value></value>
        public DbSet<ToggleState> States { get; set; }

        /// <summary>
        /// Save Changes
        /// </summary>
        /// <param name="acceptAllChangesOnSuccess"></param>
        /// <returns></returns>
        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            OnBeforeSaving();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="acceptAllChangesOnSuccess"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            OnBeforeSaving();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        /// <summary>
        /// Alters the instance to add tracking columns
        /// </summary>
        private void OnBeforeSaving()
        {
            var entries = ChangeTracker.Entries();
            TrackableUtils.manageTrackableColumns(entries);
        }
    }
}
