using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using PPGCRM.Core.Abstractions.Stages;
using PPGCRM.Core.Contracts.Stages;
using PPGCRM.Core.Models;

namespace PPGCRM.Application.Services
{
    public class StagesService : IStagesService
    {
        private readonly IStagesRepository _stagesRepository;
        private readonly IMapper _mapper;
        
        public StagesService(IStagesRepository stagesRepository, IMapper mapper)
        {
            _stagesRepository = stagesRepository;
            _mapper = mapper;
        }
        public async Task<List<StageModel>> GetAllStagesByProjectIdAsync(Guid projectId)
        {
            return await _stagesRepository.GetAllStagesByProjectIdAsync(projectId);
        }
        public async Task AddStageByProjectIdAsync(Guid projectId, StageCreateDTO stageCreateDto)
        {
            var stageModel = new StageModel(
                Guid.NewGuid(),
                projectId,
                stageCreateDto.StageName,
                null,
                null);
            await _stagesRepository.AddStageByProjectIdAsync(stageModel);
        }
        public async Task UpdateStageAsync(Guid stageId, StageUpdateDTO stageUpdate)
        {
            await _stagesRepository.UpdateStageAsync(stageId, stageUpdate);
        }

        public async Task DeleteStageAsync(Guid stageId)
        {
            await _stagesRepository.DeleteStageAsync(stageId);
        }
    }
}
