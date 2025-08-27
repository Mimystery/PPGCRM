namespace PPGCRM.Core.Contracts.Tasks;

public class TaskUpdateDTO
{
     public string? TaskName { get; set; }
    public bool IsDone { get; set; } = false;
}