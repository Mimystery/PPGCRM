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
    public class StageConfiguration : IEntityTypeConfiguration<StageEntity>
    {
        public void Configure(EntityTypeBuilder<StageEntity> builder)
        {
            builder.HasKey(s => s.StageId);

            builder.HasMany(s => s.Processes).WithOne(p => p.Stage).HasForeignKey(p => p.StageId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(s => s.StageName).IsRequired();
        }
    }
}
