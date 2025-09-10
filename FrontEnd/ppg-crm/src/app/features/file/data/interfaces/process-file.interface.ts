export interface ProcessFile{
    processFileId: string;
    processId: string;
    fileName: string;
    filePath: string;
    mimeType: string;
    fileSize: number;
    uploadedAt: Date;
    uploadedBy: string;
}