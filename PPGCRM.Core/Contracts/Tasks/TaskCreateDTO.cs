namespace PPGCRM.Core.Contracts.Tasks;

public class TaskCreateDTO
{
    public string TaskName { get; set; }
    public bool IsDone { get; set; } = false;
}