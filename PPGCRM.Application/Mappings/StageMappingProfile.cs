using AutoMapper;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Entities;

namespace PPGCRM.Application.Mappings;

public class StageMappingProfile : Profile
{
    public StageMappingProfile()
    {
        CreateMap<StageEntity, StageModel>();
        CreateMap<StageModel, StageEntity>();
    }
    
}