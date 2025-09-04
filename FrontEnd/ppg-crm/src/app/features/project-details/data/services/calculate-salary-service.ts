import { Injectable } from '@angular/core';
import { User } from '../../../../core/auth/data/interfaces/user.interface';
import { ProcessDetails } from '../../stages-list/data/interfaces/process.interface';

@Injectable({
  providedIn: 'root'
})
export class CalculateSalaryService {

  getWorkingDays (start: Date, end: Date): number {
      const startDate = new Date(start)
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
  
    calculateSalary(user: User, startDate: Date | null, factEndDate: Date | null){
      if (!startDate) {
        return { daysWorked: 0, totalSalary: 0 };
      }

      const endDate = this.getEffectiveEndDate(factEndDate);
      const daysWorked = this.getWorkingDays(startDate, endDate);
  
      const dailySalary = user.salary / 22;
      const totalSalary = dailySalary * daysWorked;
  
      return { daysWorked, totalSalary };
    }

    getTotalSalary(process: ProcessDetails): number {
    if (!process || !process.responsibleUsers) return 0;

    return process.responsibleUsers
      .map(user => this.calculateSalary(user, process.startDate!, process.factEndDate).totalSalary)
      .reduce((sum, salary) => sum + salary, 0);
  }

}
