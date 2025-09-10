import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProcessFile } from '../interfaces/process-file.interface';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  http = inject(HttpClient)

  addFileToProcess(processId: string, file: File){
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`https://localhost:7189/api/ProcessFiles/UploadProcessFile/${processId}/files`, formData)
  }

  getProcessFiles(processId: string){
    return this.http.get<ProcessFile[]>(`https://localhost:7189/api/ProcessFiles/GetAllProcessFiles/${processId}/files`)
  }

  downloadFile(fileId: string){
    return this.http.get(`https://localhost:7189/api/ProcessFiles/DownloadProcessFile/${fileId}`, { responseType: 'blob' })
  }

  deleteFile(fileId: string){
    return this.http.delete(`https://localhost:7189/api/ProcessFiles/DeleteProcessFile/${fileId}/files`)
  }

  checkFile(processId: string, fileName: string){
    return this.http.get<boolean>(`https://localhost:7189/api/ProcessFiles/GetProcessFileByName/${processId}/${fileName}`)
  }

  // checkFile(fileName: string): boolean{
  //   let isExist = false;
  //   this.checkFileName(fileName).subscribe(val => isExist = val)
  //   return isExist
  // }
}
