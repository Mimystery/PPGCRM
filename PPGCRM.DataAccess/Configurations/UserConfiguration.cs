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
    public class UserConfiguration : IEntityTypeConfiguration<UserEntity>
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            builder.HasKey(u => u.UserId);

            builder.HasMany(u => u.Processes).WithMany(p => p.ResponsibleUsers);

            builder.Property(u => u.UserName).IsRequired();
            builder.Property(u => u.PasswordHash).IsRequired();
            builder.Property(u => u.Email).IsRequired();
            builder.Property(u => u.FirstName).IsRequired();
            builder.Property(u => u.LastName).IsRequired();
            builder.Property(u => u.Phone).IsRequired();
            builder.Property(u => u.Role).IsRequired();
            builder.Property(u => u.Salary).IsRequired();
        }
    }
}
