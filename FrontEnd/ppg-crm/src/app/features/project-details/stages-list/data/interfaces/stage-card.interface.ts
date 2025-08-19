import { ProcessCard } from "./process-card.interface";

export interface StageCard {
    stageId: string;
    projectId: string;
    stageName: string;
    planEndDate: Date;
    processes: ProcessCard[]
}
