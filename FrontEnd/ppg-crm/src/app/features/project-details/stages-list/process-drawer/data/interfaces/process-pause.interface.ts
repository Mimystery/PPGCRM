export interface ProcessPause {
    pauseId: string;
    processId: string;
    startPauseDate: Date;
    endPauseDate: Date | null;
}