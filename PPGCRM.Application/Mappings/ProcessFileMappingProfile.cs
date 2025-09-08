using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Entities;

namespace PPGCRM.Application.Mappings
{
    public class ProcessFileMappingProfile : Profile
    {
        public ProcessFileMappingProfile()
        {
            CreateMap<ProcessFileEntity, ProcessFileModel>();
            CreateMap<ProcessFileModel, ProcessFileEntity>();
        }
    }
}
