using AutoMapper;
using PPGCRM.Core.Abstractions.Processes;
using PPGCRM.Core.Contracts.ProcessFiles;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPGCRM.Application.Services
{
    public class ProcessFilesService : IProcessFilesService
    {
        private readonly IProcessFilesRepository _processFilesRepository;
        private readonly IMapper _mapper;

        public ProcessFilesService(IProcessFilesRepository processFilesRepository, IMapper mapper)
        {
            _processFilesRepository = processFilesRepository;
            _mapper = mapper;
        }

        public async Task<List<ProcessFileModel>> GetAllFilesByProcessIdAsync(Guid processId)
        {
            return await _processFilesRepository.GetAllFilesByProcessIdAsync(processId);
        }

        public async Task<ProcessFileModel> GetFileByIdAsync(Guid fileId)
        {
            return await _processFilesRepository.GetFileByIdAsync(fileId);
        }

        public async Task AddFileAsync(ProcessFileCreateDTO fileModel)
        {
            var processFileModel = new ProcessFileModel()
            {
                ProcessFileId = fileModel.ProcessFileId,
                ProcessId = fileModel.ProcessId,
                FileName = fileModel.FileName,
                FilePath = fileModel.FilePath,
                MimeType = fileModel.MimeType,
                FileSize = fileModel.FileSize,
                UploadedAt = fileModel.UploadedAt,
                UploadedBy = fileModel.UploadedBy
            };

            await _processFilesRepository.AddFileAsync(processFileModel);
        }

        public async Task UpdateFileAsync(Guid fileId, ProcessFileUpdateDTO processFileUpdateDto)
        {
            await _processFilesRepository.UpdateFileAsync(fileId, processFileUpdateDto);
        }

        public async Task DeleteFileAsync(Guid fileId)
        {
            await _processFilesRepository.DeleteFileAsync(fileId);
        }
    }
}
