using AutoMapper;
using PPGCRM.Core.Models;
using PPGCRM.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PPGCRM.Core.Contracts.ProcessFiles;

namespace PPGCRM.DataAccess.Repositories
{
    public class ProcessFilesRepository : IProcessFilesRepository
    {
        private readonly CRMDbContext _context;
        private readonly IMapper _mapper;

        public ProcessFilesRepository(CRMDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ProcessFileModel>> GetAllFilesByProcessIdAsync(Guid processId)
        {
            var filesEntity = await _context.ProcessFiles.Where(pf => pf.ProcessId == processId)
                .ToListAsync();

            return _mapper.Map<List<ProcessFileModel>>(filesEntity);
        }

        public async Task<ProcessFileModel> GetFileByIdAsync(Guid fileId)
        {
            var fileEntity = await _context.ProcessFiles
                .FirstOrDefaultAsync(f => f.ProcessFileId == fileId);
            if (fileEntity == null)
            {
                throw new KeyNotFoundException($"File with ID {fileId} NOT found.");
            }
            return _mapper.Map<ProcessFileModel>(fileEntity);
        }

        public async Task AddFileAsync(ProcessFileModel fileModel)
        {
            var fileEntity = _mapper.Map<ProcessFileEntity>(fileModel);
            await _context.ProcessFiles.AddAsync(fileEntity);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateFileAsync(Guid fileId, ProcessFileUpdateDTO processFileUpdateDto)
        {
            throw new NotImplementedException();
        }
        public async Task DeleteFileAsync(Guid fileId)
        {
            var fileEntity = await _context.ProcessFiles
                .FirstOrDefaultAsync(f => f.ProcessFileId == fileId);
            if (fileEntity == null)
            {
                throw new KeyNotFoundException($"File with ID {fileId} NOT found.");
            }
            _context.ProcessFiles.Remove(fileEntity);
            await _context.SaveChangesAsync();
        }
    }
}
