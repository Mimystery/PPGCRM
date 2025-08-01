using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PPGCRM.DataAccess
{
    public class CRMDbContext : DbContext
    {
        public CRMDbContext(DbContextOptions<CRMDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure your entities here
            // Example: modelBuilder.Entity<YourEntity>().ToTable("YourTableName");
        }
        // Define DbSets for your entities
        // public DbSet<YourEntity> YourEntities { get; set; }
    }
}
