namespace PPGCRM.Core.Contracts.Stages;

public class StageUpdateDTO
{
    public string StageName { get; set; } = string.Empty;
    public DateTime? PlanEndDate { get; set; }
}