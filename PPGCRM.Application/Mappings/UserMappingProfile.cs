using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using PPGCRM.Core.Contracts.Users;
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
            CreateMap<UserEntity, UserModel>();
            CreateMap<UserModel, UserEntity>();

        }
    }
}
