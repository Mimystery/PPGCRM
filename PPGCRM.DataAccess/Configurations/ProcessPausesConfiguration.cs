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
    public class ProcessPausesConfiguration : IEntityTypeConfiguration<ProcessPauseEntity>
    {
        public void Configure(EntityTypeBuilder<ProcessPauseEntity> builder)
        {
            builder.HasKey(pp => pp.PauseId);

            builder.HasOne(pp => pp.Process).WithMany(p => p.ProcessPauses);
        }
    }
}
