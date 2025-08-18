namespace PPGCRM.Core.Contracts.Stages;

public class StageCreateDTO
{
    public string StageName { get; set; } = string.Empty;
    public DateTime? PlanEndDate { get; set; }
}