import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { FormsModule } from '@angular/forms';
import { Stage } from '../kanban/data/interfaces/stage.interface';
import { StagesService } from '../kanban/data/services/stages-service';
import { ProcessDetails } from '../kanban/data/interfaces/process.interface';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [DatePipe, NzSelectComponent, NzOptionComponent, FormsModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.less'
})
export class CalendarComponent implements AfterViewInit{
  stagesService = inject(StagesService);
  public selectedProcess = signal<ProcessDetails | null>(null);
  public selectedStageId = signal<string>('All');

  @ViewChild('calendar', { static: true }) calendarRef!: ElementRef;
  private calendar!: Calendar;
  public currentMonthDate!: Date;

  stages: Stage[] = [];

  constructor(){
    this.stagesService.getStages().subscribe(val => {
    this.stages = val.map(stage => ({
      ...stage,
      processes: stage.processes.map(process => ({
        ...process,
        startDate: process.startDate ? new Date(process.startDate) : null,
        factEndDate: process.factEndDate ? new Date(process.factEndDate) : null
        
      }))
    }));
    this.loadCalendarEvents();
  });
  }

  ngAfterViewInit() {
    this.calendar = new Calendar(this.calendarRef.nativeElement, {
      defaultView: 'month',
      usageStatistics: false,
      useFormPopup: true,
      useDetailPopup: true
    });

    this.updateCurrentMonth();

    this.loadCalendarEvents();

    // Обновляем месяц при переключении
    this.calendar.on('afterRenderSchedule', () => this.updateCurrentMonth());
  }

  private loadCalendarEvents() {
    if (!this.stages || this.stages.length === 0) return;

    const events = this.stages.flatMap(stage => 
      stage.processes
        .filter(p => p.startDate && p.planEndDate) // только с датами
        .map(p => ({
          id: p.processId,
          calendarId: stage.stageId, // можно для цветов или фильтра
          title: p.processName,
          category: 'allday', // тип события
          start: p.startDate,
          end: p.planEndDate
        }))
    );

    this.calendar.createEvents(events);
  }

  goPrev() {
    this.calendar.prev();
    this.updateCurrentMonth();
  }

  goToday() {
    this.calendar.today();
    this.updateCurrentMonth();
  }

  goNext() {
    this.calendar.next();
    this.updateCurrentMonth();
  }

  private updateCurrentMonth() {
    this.currentMonthDate = this.calendar.getDate();
  }
}
