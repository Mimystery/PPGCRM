using PPGCRM.Core.Contracts.ProcessFiles;
using PPGCRM.Core.Models;

namespace PPGCRM.DataAccess.Repositories;

public interface IProcessFilesRepository
{
    Task<List<ProcessFileModel>> GetAllFilesByProcessIdAsync(Guid processId);
    Task<ProcessFileModel> GetFileByIdAsync(Guid fileId);
    Task<ProcessFileModel> GetFileByFileName(Guid processId, string fileName);
    Task AddFileAsync(ProcessFileModel fileModel);
    Task UpdateFileAsync(ProcessFileModel processFileUpdateDto);
    Task DeleteFileAsync(Guid fileId);
}