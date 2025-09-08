using PPGCRM.Core.Contracts.ProcessFiles;
using PPGCRM.Core.Models;

namespace PPGCRM.DataAccess.Repositories;

public interface IProcessFilesRepository
{
    Task<List<ProcessFileModel>> GetAllFilesByProcessIdAsync(Guid processId);
    Task<ProcessFileModel> GetFileByIdAsync(Guid fileId);
    Task AddFileAsync(ProcessFileModel fileModel);
    Task UpdateFileAsync(Guid fileId, ProcessFileUpdateDTO processFileUpdateDto);
    Task DeleteFileAsync(Guid fileId);
}