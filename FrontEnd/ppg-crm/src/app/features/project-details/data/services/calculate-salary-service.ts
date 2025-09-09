import { inject, Injectable } from '@angular/core';
import { User } from '../../../../core/auth/data/interfaces/user.interface';
import { ProcessDetails } from '../../stages-list/data/interfaces/process.interface';
import { PauseService } from './pause-service';

@Injectable({
  providedIn: 'root'
})
export class CalculateSalaryService {
  pauseService = inject(PauseService);

  getWorkingDays (start: Date, end: Date): number {
      const startDate = new Date(start!)
      const endDate = new Date(end)
      let count = 0;
  
      for(let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)){
        const day = d.getDay();
        if(day !== 0 && day !== 6){
          count++;
        }
      }
  
      return count;
    }
  
    getEffectiveEndDate(factEndDate: Date | null): Date {
      const today = new Date();
      let end = factEndDate || today;
  
      const day = end.getDay();
      if(day === 6){
        end.setDate(end.getDate() - 1);
      } else if (day === 0){
        end.setDate(end.getDate() - 2);
      }
  
      return end;
    }
  
    calculateSalary(user: User, process: ProcessDetails){
      if (!process.startDate) {
        return { daysWorked: 0, totalSalary: 0 };
      }

      const effectiveEnd = this.getEffectiveEndDate(process.factEndDate);
      const totalDays = this.getWorkingDays(process.startDate!, effectiveEnd);

      const pauseDays = this.pauseService.getTotalPauseDays(process);
      const workedDays = totalDays - pauseDays
  
      const dailySalary = user.salary / 22;
      const totalSalary = dailySalary * workedDays;
  
      return { daysWorked: workedDays, totalSalary };
    }

    getTotalSalary(process: ProcessDetails): number {
    if (!process || !process.responsibleUsers) return 0;

    return process.responsibleUsers
      .map(user => this.calculateSalary(user, process).totalSalary)
      .reduce((sum, salary) => sum + salary, 0);
  }

}
