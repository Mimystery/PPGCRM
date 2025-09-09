using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using PPGCRM.Core.Contracts;
using PPGCRM.Core.Contracts.Projects;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Entities;

namespace PPGCRM.Application.Mappings
{
    public class ProjectMappingProfile : Profile
    {
        public ProjectMappingProfile()
        {
            CreateMap<ProjectEntity, ProjectModel>();
            CreateMap<ProjectModel, ProjectEntity>();
            CreateMap<ProjectEntity, ProjectDetailsDTO>();
            CreateMap<ProcessEntity, ProjectMainDTO>();
        }
    }
}
