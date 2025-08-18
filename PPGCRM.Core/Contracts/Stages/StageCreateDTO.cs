namespace PPGCRM.Core.Contracts.Stages;

public class StageCreateDTO
{
    public Guid StageId {get; set;}
    public Guid ProjectId { get; set; } 
    public string StageName { get; set; } = string.Empty;
    public DateTime? PlanEndDate { get; set; }
}