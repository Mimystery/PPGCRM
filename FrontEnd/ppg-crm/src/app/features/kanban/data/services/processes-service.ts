import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {
  http = inject(HttpClient);


  /*
  ***TODO: VLAD CHECKNI
  **NIE RABOTAET KAK NADO, NO POKA NE PONIMAYU POCHEMU
   */
  addNewProcess(processName: string, stageId: string) {
    const createProcessBody = { processName: processName }
    return this.http.post(`https://localhost:7189/api/Processes/AddProcessByStageId/${stageId}`, createProcessBody);
  }
}
