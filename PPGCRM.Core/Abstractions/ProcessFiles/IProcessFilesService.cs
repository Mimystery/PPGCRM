using PPGCRM.Core.Contracts.ProcessFiles;
using PPGCRM.Core.Models;

namespace PPGCRM.Application.Services;

public interface IProcessFilesService
{
    Task<List<ProcessFileModel>> GetAllFilesByProcessIdAsync(Guid processId);
    Task<ProcessFileModel> GetFileByIdAsync(Guid fileId);
    Task AddFileAsync(ProcessFileCreateDTO fileModel);
    Task UpdateFileAsync(Guid fileId, ProcessFileUpdateDTO processFileUpdateDto);
    Task DeleteFileAsync(Guid fileId);
}