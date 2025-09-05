using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using PPGCRM.Core.Abstractions.Processes;
using PPGCRM.Core.Contracts.Processes;
using PPGCRM.Core.Contracts.Users;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess;

namespace PPGCRM.Application.Services
{
    public class ProcessesService : IProcessesService
    {
        private readonly IProcessesRepository _processesRepository;
        private readonly IMapper _mapper;

        public ProcessesService(IProcessesRepository processesRepository, IMapper mapper)
        {
            _processesRepository = processesRepository;
            _mapper = mapper;
        }

        public async Task<List<ProcessModel>> GetAllProcessesByStageIdAsync(Guid stageId)
        {
            return await _processesRepository.GetAllProcessesByStageIdAsync(stageId);
        }

        public async Task<ProcessModel> GetProcessById(Guid processId)
        {
            return await _processesRepository.GetProcessById(processId);
        }

        public async Task AddProcessByStageIdAsync(Guid stageId, ProcessCreateDTO processCreate)
        {
            var processModel = new ProcessModel(
                Guid.NewGuid(),
                stageId,
                processCreate.ProcessName,
                null, // startDate
                null, // planEndDate
                null, // factEndDate
                null, // notes
                null, // notDoneReasons
                null, // problems
                0, // sortOrder
                processCreate.Status, // status
                null, // progress
                null, // totalProcessCost
                DateTime.UtcNow, // createdAt
                new List<TaskModel>(), // tasks
                new List<UserMainCardDTO>() // responsibleUsers
            );
            await _processesRepository.AddProcessByStageIdAsync(stageId, processModel);
        }

        public async Task AddResponsibleUserAsync(Guid processId, Guid userId)
        {
            await _processesRepository.AddResponsibleUserAsync(processId, userId);
        }
        public async Task RemoveResponsibleUserAsync(Guid processId, Guid userId)
        {
            await _processesRepository.RemoveResponsibleUserAsync(processId, userId);
        }
        public async Task UpdateProcessAsync(Guid processId, ProcessUpdateDTO processUpdate)
        {
            await _processesRepository.UpdateProcessAsync(processId, processUpdate);
        }

        public async Task DeleteProcessAsync(Guid processId)
        {
            await _processesRepository.DeleteProcessAsync(processId);
        }
    }
}
