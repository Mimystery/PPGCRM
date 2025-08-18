using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PPGCRM.Core.Abstractions.Stages;
using PPGCRM.Core.Contracts.Stages;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Entities;

namespace PPGCRM.DataAccess.Repositories
{
    public class StagesRepository : IStagesRepository//JAK DELAT? DA
    {
        private readonly CRMDbContext _context;
        private readonly IMapper _mapper;

        public StagesRepository(CRMDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<StageModel>> GetAllStagesByProjectIdAsync(Guid projectId) // CYKA DE SERVICES CHE DALSHE ????!!!!!
        {
            var stages = await _context.Stages
                .Where(s => s.ProjectId == projectId)
                .Include(s => s.Processes)
                .ToListAsync();

            return _mapper.Map<List<StageModel>>(stages); 
        }

        public async Task AddStageByProjectIdAsync(StageModel stage) //DOBRE😏🤙
        {
            var stageEntity = _mapper.Map<StageEntity>(stage);  //CHE DALSHE?? UDALIT?
            _context.Stages.Add(stageEntity); //tipa??
            await _context.SaveChangesAsync();
        }
        public async Task UpdateStageAsync(Guid stageId, StageUpdateDTO stageUpdate)
        {
            var stageEntity = await _context.Stages.FirstOrDefaultAsync(s => s.StageId == stageId);
            if (stageEntity == null)
            {
                throw new KeyNotFoundException($"Stage with ID {stageId} not found.");
            }

            if (stageUpdate.StageName != null)
            {
                stageEntity.StageName = stageUpdate.StageName;
            }
            if (stageUpdate.PlanEndDate != null)
            {
                stageEntity.PlanEndDate = stageUpdate.PlanEndDate; //poniav 
            }
            await _context.SaveChangesAsync();
        }

        public async Task DeleteStageAsync(Guid stageId)
        {
            var stageEntity = await _context.Stages.FirstOrDefaultAsync(s => s.StageId == stageId);
            if (stageEntity == null)
            {
                throw new KeyNotFoundException($"Stage with ID {stageId} not found.");
            }

            _context.Stages.Remove(stageEntity);
            await _context.SaveChangesAsync();
        }
        //NIE SOMNIVEAJUS V MOMY PUPSI❤️😏
    }
}
