using PPGCRM.Core.Contracts.Users;
using PPGCRM.Core.Models;

namespace PPGCRM.Core.Contracts.Processes;

public class ProcessCreateDTO
{
    public Guid StageId { get; set; }
    public string ProcessName { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? PlanEndDate { get; set; }
    public DateTime? FactEndDate { get; set; }
    public string? Notes { get; set; }
    public string? NotDoneReasons { get; set; }
    public string? Problems { get; set; }
    public int SortOrder { get; set; }
    public string Status { get; set; } 
    public int Progress { get; set; } 
    public decimal? TotalProcessCost { get; set; } 
    public List<TaskModel> Tasks { get; set; }
    public List<UserMainCardDTO> ResponsibleUsers { get; set; }
}