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
    public class ProjectConfiguration : IEntityTypeConfiguration<ProjectEntity>
    {
        public void Configure(EntityTypeBuilder<ProjectEntity> builder)
        {
            builder.HasKey(p => p.ProjectId);

            builder.HasMany(p => p.Stages).WithOne(s => s.Project)
                .HasForeignKey(s => s.ProjectId).OnDelete(DeleteBehavior.Cascade);

            builder.Property(p => p.ProjectName).IsRequired();
            builder.Property(p => p.Status).IsRequired();
        }
    }
}
