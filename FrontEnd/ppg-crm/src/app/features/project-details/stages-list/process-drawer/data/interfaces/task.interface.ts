export interface Task {
    taskId: string;
    processId: string;
    taskName: string;
    createdAt: Date;
    isDone: boolean;
}