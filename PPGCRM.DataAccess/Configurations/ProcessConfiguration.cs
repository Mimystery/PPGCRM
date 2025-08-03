using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PPGCRM.DataAccess.Entities;

namespace PPGCRM.DataAccess.Configurations
{
    public class ProcessConfiguration : IEntityTypeConfiguration<ProcessEntity>
    {
        public void Configure(EntityTypeBuilder<ProcessEntity> builder)
        {
            builder.HasKey(p => p.ProcessId);

            builder.HasMany(p => p.Tasks)
                .WithOne(t => t.Process)
                .HasForeignKey(t => t.ProcessId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(p => p.ResponsibleUsers).WithMany(u => u.Processes);

            builder.Property(p => p.ProcessName).IsRequired();
            builder.Property(p => p.SortOrder).IsRequired();
            builder.Property(p => p.Status).IsRequired();
            builder.Property(p => p.Progress).IsRequired();
        }
    }
}
