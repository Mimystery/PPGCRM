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
    public class StagesRepository : IStagesRepository
    {
        private readonly CRMDbContext _context;
        private readonly IMapper _mapper;

        public StagesRepository(CRMDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<StageModel>> GetAllStagesByProjectIdAsync(Guid projectId) 
        {
            var stages = await _context.Stages
                .Where(s => s.ProjectId == projectId)
                .Include(s => s.Processes)
                    .ThenInclude(p => p.ResponsibleUsers)
                .Include(s => s.Processes)
                    .ThenInclude(p => p.Tasks)
                .Include(s => s.Processes)
                    .ThenInclude(p => p.ProcessPauses)
                .Include(s => s.Processes)
                    .ThenInclude(p => p.ProcessFiles)
                .OrderBy(s => s.CreatedAt)
                .ToListAsync();

            return _mapper.Map<List<StageModel>>(stages); 
        }

        public async Task AddStageByProjectIdAsync(StageModel stage) 
        {
            var stageEntity = _mapper.Map<StageEntity>(stage); 
            _context.Stages.Add(stageEntity);
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
                stageEntity.PlanEndDate = stageUpdate.PlanEndDate;
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
    }
}
