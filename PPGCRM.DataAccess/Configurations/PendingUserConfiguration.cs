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
    public class PendingUserConfiguration : IEntityTypeConfiguration<PendingUserEntity>
    {
        public void Configure(EntityTypeBuilder<PendingUserEntity> builder)
        {
            builder.HasKey(u => u.UserId);

            builder.Property(u => u.FirstName).IsRequired(); // Assuming UserId is not auto-generated
            builder.Property(u => u.LastName).IsRequired();
            builder.Property(u => u.Role).IsRequired(); // Assuming Role is an enum and required
            builder.Property(u => u.RegistrationCode).IsRequired();
            builder.Property(u => u.isRegistered).IsRequired();

        }
    }
}
