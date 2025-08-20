namespace PPGCRM.Core.Contracts.Tasks;

public class TaskCreateDTO
{
    public string? TaskName { get; }
    public bool IsDone { get; } = false;
}