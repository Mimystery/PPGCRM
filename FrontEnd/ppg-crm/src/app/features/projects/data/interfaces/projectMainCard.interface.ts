export interface ProjectMainCard {

    projectId: string,
    projectName: string,
    description: string | null,
    status: string,
    startDate: Date | null,
    endDate: Date | null,
    progress: number,
    isArchived: boolean,
    processCointByStatus: {
        [key: string]: number
    };

}