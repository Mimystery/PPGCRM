using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using PPGCRM.Core.Contracts.Clients;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Entities;

namespace PPGCRM.Application.Mappings
{
    public class ClientMappingProfile : Profile
    {
        public ClientMappingProfile()
        {
            CreateMap<ClientModel, ClientEntity>();
            CreateMap<ClientEntity, ClientModel>();
            CreateMap<ClientEntity, ClientInProjectDTO>();
        }
    }
}
