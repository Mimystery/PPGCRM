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
    public class ClientConfiguration : IEntityTypeConfiguration<ClientEntity>
    {
        public void Configure(EntityTypeBuilder<ClientEntity> builder)
        {
            builder.HasKey(c => c.ClientId);

            builder.HasMany(c => c.Projects).WithOne(p => p.Client)
                .HasForeignKey(p => p.ClientId);

            builder.Property(c => c.CompanyName).IsRequired();
        }
    }
}
