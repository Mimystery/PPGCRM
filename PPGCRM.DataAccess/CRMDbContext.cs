using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PPGCRM.DataAccess.Configurations;
using PPGCRM.DataAccess.Entities;

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
            modelBuilder.ApplyConfiguration(new ClientConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectConfiguration());
            modelBuilder.ApplyConfiguration(new StageConfiguration());
            modelBuilder.ApplyConfiguration(new ProcessConfiguration());
            modelBuilder.ApplyConfiguration(new TaskConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new PendingUserConfiguration());
        }
        // Define DbSets for your entities
        // public DbSet<YourEntity> YourEntities { get; set; }
        public DbSet<ClientEntity> Clients { get; set; }
        public DbSet<ProjectEntity> Projects { get; set; }
        public DbSet<StageEntity> Stages { get; set; }
        public DbSet<ProcessEntity> Processes { get; set; }
        public DbSet<TaskEntity> Tasks { get; set; }
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<PendingUserEntity> PendingUsers { get; set; }
        public DbSet<RefreshTokenEntity> RefreshTokens { get; set; } 

    }
}
