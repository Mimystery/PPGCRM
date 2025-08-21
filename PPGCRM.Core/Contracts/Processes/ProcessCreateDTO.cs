using PPGCRM.Core.Contracts.Users;
using PPGCRM.Core.Enums;
using PPGCRM.Core.Models;

namespace PPGCRM.Core.Contracts.Processes;

public class ProcessCreateDTO
{
    public string ProcessName { get; set; } = string.Empty;
    public ProcessStatus Status { get; set; } = ProcessStatus.ToDo;
}