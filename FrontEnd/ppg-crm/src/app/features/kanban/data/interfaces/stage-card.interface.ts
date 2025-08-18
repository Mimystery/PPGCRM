import { ProcessCard } from "../../process-card/process-card";

export interface StageCard {
    stageId: string;
    projectId: string;
    stageName: string;
    planEndDate: Date;
    processes: ProcessCard[]
}