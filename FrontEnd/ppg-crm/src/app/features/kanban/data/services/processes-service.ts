import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ProcessDetails } from '../interfaces/process.interface';

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {
  http = inject(HttpClient);

  addNewProcess(processName: string, stageId: string) {
    const createProcessBody = { processName: processName }
    return this.http.post(`https://localhost:7189/api/Processes/AddProcessByStageId/${stageId}`, createProcessBody);
  }

  getProcesses(stageId: string){
    return this.http.get<ProcessDetails[]>(`https://localhost:7189/api/Processes/GetAllProcessesByStageId/${stageId}`)
  }

  getProcessById(processId: string){
    return this.http.get<ProcessDetails>(`https://localhost:7189/api/Processes/GetProcessById/${processId}`)
  }

  updateProcess(processId: string, process: ProcessDetails){
    return this.http.put<ProcessDetails>(`https://localhost:7189/api/Processes/UpdateProcess/${processId}`, process)
  }

  addResponsibleUser(userId: string, processId: string){
    return this.http.post(`https://localhost:7189/api/Processes/AddResponsibleUser/${processId}/${userId}`, null)
  }

  removeResponsibleUser(userId: string, processId: string){
    return this.http.delete(`https://localhost:7189/api/Processes/RemoveResponsibleUser/${processId}/${userId}`)
  }

  deleteProcess(processId: string){
    return this.http.delete(`https://localhost:7189/api/Processes/DeleteProcess/${processId}`)
  }
}
