using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using PPGCRM.Core.Contracts.ProcessPauses;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Repositories;

namespace PPGCRM.Application.Services
{
    public class ProcessPausesService : IProcessPausesService
    {
        private readonly IProcessPausesRepository _processPausesRepository;
        private readonly IMapper _mapper;

        public ProcessPausesService(IProcessPausesRepository processPausesRepository, IMapper mapper)
        {
            _processPausesRepository = processPausesRepository;
            _mapper = mapper;
        }

        public async Task<List<ProcessPauseModel>> GetAllProcessPausesByProcessId(Guid processId)
        {
            return await _processPausesRepository.GetAllProcessPausesByProcessId(processId);
        }

        public async Task AddProcessPause(Guid processId)
        {
            var processModel = new ProcessPauseModel
            {
                PauseId = Guid.NewGuid(),
                ProcessId = processId,
                StartPauseDate = DateTime.UtcNow,
                EndPauseDate = null
            };

            await _processPausesRepository.AddProcessPause(processModel);
        }

        public async Task UpdateProcessPause(Guid pauseId, ProcessPauseUpdateDTO processPauseUpdateDto)
        {
            await _processPausesRepository.UpdateProcessPause(pauseId, processPauseUpdateDto);
        }

        public async Task DeleteProcessPause(Guid pauseId)
        {
            await _processPausesRepository.DeleteProcessPause(pauseId);
        }
    }
}
