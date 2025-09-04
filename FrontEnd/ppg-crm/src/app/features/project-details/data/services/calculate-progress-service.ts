import { Injectable } from '@angular/core';
import { ProcessDetails } from '../../stages-list/data/interfaces/process.interface';

@Injectable({
  providedIn: 'root'
})
export class CalculateProgressService {
  calculateProgress(process: ProcessDetails): number {
      if(!process || !process.tasks || process.tasks.length === 0){
      return 0;
    }

    const doneCount = process.tasks.filter(t => t.isDone).length;
    const percent = Math.round((doneCount / process.tasks.length) * 100);

    return percent;
  }
}
