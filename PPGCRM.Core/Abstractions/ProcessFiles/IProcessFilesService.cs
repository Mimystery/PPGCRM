using PPGCRM.Core.Contracts.ProcessFiles;
using PPGCRM.Core.Models;

namespace PPGCRM.Application.Services;

public interface IProcessFilesService
{
    Task<List<ProcessFileModel>> GetAllFilesByProcessIdAsync(Guid processId);
    Task<ProcessFileModel> GetFileByIdAsync(Guid fileId);
    Task<ProcessFileModel> GetFileByName(Guid processId, string fileName);
    Task AddFileAsync(ProcessFileCreateDTO fileModel);
    Task UpdateFileAsync(ProcessFileModel processFileUpdateDto);
    Task DeleteFileAsync(Guid fileId);
}