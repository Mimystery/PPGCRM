import { inject, Injectable } from '@angular/core';
import { ProcessDetails } from '../../stages-list/data/interfaces/process.interface';
import { HttpClient } from '@angular/common/http';
import { ProcessPause } from '../../stages-list/process-drawer/data/interfaces/process-pause.interface';

@Injectable({
  providedIn: 'root'
})
export class PauseService {
  http = inject(HttpClient)

  getPauseDays(start: Date, end: Date | null): number {
    const endDate = end ? new Date(end) : new Date();
    let count = 0;
    for (let d = new Date(start); d <= endDate; d.setDate(d.getDate() + 1)) {
      const day = d.getDay();
      if (day !== 0 && day !== 6) {
        count++;
      }
    }
    return count;
  }

  getTotalPauseDays(process: ProcessDetails): number {
    if (!process.processPauses || process.processPauses.length === 0) return 0;

  const daySet = new Set<string>();

  process.processPauses.forEach(pause => {
    const start = new Date(pause.startPauseDate);
    const end = pause.endPauseDate ? new Date(pause.endPauseDate) : new Date();

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const day = d.getDay();
      if (day !== 0 && day !== 6) {
        const key = d.toISOString().split('T')[0];
        daySet.add(key);
      }
    }
  });

  return daySet.size;
  }

  getAllProcessPauses(processId: string){
    return this.http.get<ProcessPause[]>(`https://localhost:7189/api/ProcessPauses/GetAllProcessPausesByProcessId/${processId}`)
  }

  addProcessPause(processId: string){
    return this.http.post(`https://localhost:7189/api/ProcessPauses/AddProcessPause/${processId}`, null);
  }

  updateProcessPause(pauseId: string){
    return this.http.put(`https://localhost:7189/api/ProcessPauses/UpdateProcessPause/${pauseId}`, null)
  }

  deletePause(pauseId: string){
    return this.http.delete(`https://localhost:7189/api/ProcessPauses/DeleteProcessPause/${pauseId}`)
  }
}
