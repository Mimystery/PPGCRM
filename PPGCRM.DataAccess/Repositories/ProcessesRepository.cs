using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PPGCRM.Core.Abstractions.Processes;
using PPGCRM.Core.Contracts.Processes;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Entities;

namespace PPGCRM.DataAccess.Repositories
{
    public class ProcessesRepository  : IProcessesRepository
    {
        private readonly CRMDbContext _context;
        private readonly IMapper _mapper;

        public ProcessesRepository(CRMDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<ProcessModel>> GetAllProcessesByStageIdAsync(Guid stageId)
        {
            var processes = await _context.Processes
                .Where(p => p.StageId == stageId)
                .Include(p => p.Tasks)
                .Include(p => p.ResponsibleUsers)
                .ToListAsync();
            
            return _mapper.Map<List<ProcessModel>>(processes);
        }

        public async Task<ProcessModel> GetProcessById(Guid processId)
        {
            var process = await _context.Processes
                .Include(p => p.ResponsibleUsers)
                .Include(p => p.Tasks)
                .FirstOrDefaultAsync(p => p.ProcessId == processId);
            if (process == null)
            {
                throw new KeyNotFoundException($"Process with ID {processId} NOT found.");
            }
            return _mapper.Map<ProcessModel>(process);
        }

        public async Task AddProcessByStageIdAsync(ProcessModel process)
        {
            var processEntity = _mapper.Map<ProcessEntity>(process);
            _context.Processes.Add(processEntity);
            await _context.SaveChangesAsync();
        }

        public async Task AddResponsibleUserAsync(Guid processId, Guid userId)
        {
            var processEntity = await _context.Processes
                .Include(p => p.ResponsibleUsers)
                .FirstOrDefaultAsync(p => p.ProcessId == processId);
            var userEntity = await _context.Users
                .Include(u => u.Processes)
                .FirstOrDefaultAsync(u => u.UserId == userId);
            if (processEntity==null)
            {
                throw new KeyNotFoundException($"Process with ID {processId} NOT found.");
            }
            if (userEntity==null)
            {
                throw new KeyNotFoundException($"User with ID {userId} NOT found.");
            }
            
            processEntity.ResponsibleUsers.Add(userEntity);
            userEntity.Processes.Add(processEntity);
            await _context.SaveChangesAsync();
        }
        public async Task RemoveResponsibleUserAsync(Guid processId, Guid userId)
        {
            var processEntity = await _context.Processes
                .Include(p => p.ResponsibleUsers)
                .FirstOrDefaultAsync(p => p.ProcessId == processId);
            var userEntity = await _context.Users
                .Include(u => u.Processes)
                .FirstOrDefaultAsync(u => u.UserId == userId);
            if (processEntity==null)
            {
                throw new KeyNotFoundException($"Process with ID {processId} NOT found.");
            }
            if (userEntity==null)
            {
                throw new KeyNotFoundException($"User with ID {userId} NOT found.");
            }
            
            processEntity.ResponsibleUsers.Remove(userEntity);
            userEntity.Processes.Remove(processEntity);
            await _context.SaveChangesAsync();
        }
        
        public async Task UpdateProcessAsync(Guid processId, ProcessUpdateDTO processUpdate)
        {
            var processEntity = await _context.Processes.FirstOrDefaultAsync(p => p.ProcessId == processId);
            if (processEntity == null)
            {
                throw new KeyNotFoundException($"Process with ID {processId} NOT FOUND.");
            }
            if (processUpdate.StageId != null)
            {
                processEntity.StageId = processUpdate.StageId;
            }
            if (processUpdate.ProcessName != null)
            {
                processEntity.ProcessName = processUpdate.ProcessName;
            }
            if (processUpdate.StartDate != null)
            {
                processEntity.StartDate = processUpdate.StartDate;
            }
            if (processUpdate.PlanEndDate != null)
            {
                processEntity.PlanEndDate = processUpdate.PlanEndDate;
            }
            if (processUpdate.FactEndDate != null)
            {
                processEntity.FactEndDate = processUpdate.FactEndDate;
            }
            if (processUpdate.Notes != null)
            {
                processEntity.Notes = processUpdate.Notes;
            }
            if (processUpdate.NotDoneReasons != null)
            {
                processEntity.NotDoneReasons = processUpdate.NotDoneReasons;
            }
            if (processUpdate.Problems != null)
            {
                processEntity.Problems = processUpdate.Problems;
            }
            if (processUpdate.SortOrder != null)
            {
                processEntity.SortOrder = processUpdate.SortOrder.Value;
            }
            if (processUpdate.Status != null)
            {
                processEntity.Status = processUpdate.Status;
            }
            if (processUpdate.Progress != null)
            {
                processEntity.Progress = processUpdate.Progress.Value;
            }
            if (processUpdate.TotalProcessCost != null)
            {
                processEntity.TotalProcessCost = processUpdate.TotalProcessCost.Value;
            }
            
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProcessAsync(Guid processId)
        {
            var processEntity = await _context.Processes.FirstOrDefaultAsync(p => p.ProcessId == processId);
            if (processEntity == null)
            {
                throw new KeyNotFoundException($"Process with provided Id {processId} not found");
            }

            _context.Processes.Remove(processEntity);
            await _context.SaveChangesAsync();
        }
    }
}
