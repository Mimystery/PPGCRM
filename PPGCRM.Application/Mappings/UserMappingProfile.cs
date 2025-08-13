using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using PPGCRM.Core.Contracts.Users;
using PPGCRM.Core.Enums;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Entities;

namespace PPGCRM.Application.Mappings
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<UserEntity, UserMainCardDTO>();
            CreateMap<UserEntity, UserDetailsDTO>();
            CreateMap<UserEntity, UserSmallCardDTO>();
            CreateMap<UserEntity, UserModel>()
                .ConstructUsing(src => new UserModel(src.UserId, src.UserName , src.PasswordHash, src.FirstName,
                    src.LastName, src.Email, src.Phone, Enum.Parse<Role>(src.Role), src.Salary));
            CreateMap<UserModel, UserEntity>();

        }
    }
}
