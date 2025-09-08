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
    public class ProcessFileConfiguration : IEntityTypeConfiguration<ProcessFileEntity>
    {
        public void Configure(EntityTypeBuilder<ProcessFileEntity> builder)
        {
            builder.HasKey(pf => pf.ProcessFileId);

            builder.HasOne(pf => pf.Process).WithMany(p => p.ProcessFiles);
        }
    }
}
