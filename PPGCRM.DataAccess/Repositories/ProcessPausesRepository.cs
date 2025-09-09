using AutoMapper;
using PPGCRM.Core.Contracts.ProcessPauses;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.DataAccess.Repositories
{
    public class ProcessPausesRepository : IProcessPausesRepository
    {
        private readonly CRMDbContext _context;
        private readonly IMapper _mapper;

        public ProcessPausesRepository(CRMDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ProcessPauseModel>> GetAllProcessPausesByProcessId(Guid processId)
        {
            var pauses = _context.ProcessPauses.Where(p => p.ProcessId == processId).ToList();

            return _mapper.Map<List<ProcessPauseModel>>(pauses);
        }

        public async Task AddProcessPause(ProcessPauseModel pauseModel)
        {
            var pauseEntity = _mapper.Map<ProcessPauseEntity>(pauseModel);
            _context.ProcessPauses.Add(pauseEntity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProcessPause(Guid pauseId, ProcessPauseUpdateDTO pauseUpdateDto)
        {
            var existingPause = _context.ProcessPauses.FirstOrDefault(p => p.PauseId == pauseId);
            if (existingPause != null)
            {
                existingPause.EndPauseDate = pauseUpdateDto.EndPauseDate;
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteProcessPause(Guid pauseId)
        {
            var existingPause = _context.ProcessPauses.FirstOrDefault(p => p.PauseId == pauseId);
            if (existingPause != null)
            {
                _context.ProcessPauses.Remove(existingPause);
                await _context.SaveChangesAsync();
            }
        }
    }
}