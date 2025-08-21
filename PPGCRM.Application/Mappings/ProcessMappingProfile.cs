using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using PPGCRM.Core.Contracts.Processes;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Entities;

namespace PPGCRM.Application.Mappings
{
    public class ProcessMappingProfile : Profile
    {
        public ProcessMappingProfile()
        {
            CreateMap<ProcessEntity, ProcessMainCardDTO>();
            CreateMap<ProcessModel, ProcessEntity>();
            CreateMap<ProcessEntity, ProcessModel>();
        }
    }
}
