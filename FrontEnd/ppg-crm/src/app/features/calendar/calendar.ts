import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { FormsModule } from '@angular/forms';
import { Stage } from '../kanban/data/interfaces/stage.interface';
import { StagesService } from '../kanban/data/services/stages-service';
import { ProcessDetails } from '../kanban/data/interfaces/process.interface';
import { ProcessDrawerComponent } from "../project-details/stages-list/process-drawer/process-drawer";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [DatePipe, NzSelectComponent, NzOptionComponent, FormsModule, ProcessDrawerComponent],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.less']
})
export class CalendarComponent implements AfterViewInit{
  private cd = inject(ChangeDetectorRef);
  stagesService = inject(StagesService);
  public selectedProcess = signal<ProcessDetails | null>(null);
  public selectedStageId = signal<string>('All');

  public processDrawerVisible =  signal(false);

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
        planEndDate: process.planEndDate ? new Date(process.planEndDate) : null,
        factEndDate: process.factEndDate ? new Date(process.factEndDate) : null
        
      }))
    }));
    if (this.calendar) {
        this.loadCalendarEvents();
      }
  });
  }

  private getColor(value: string): string {
  switch(value) {
    case 'ToDo': return '#9E9E9E';
    case 'InProgress': return '#2679ff';
    case 'Paused': return '#FF9800';
    case 'Done': return '#00C040';
    case 'Expired': return '#F44336';
    case 'Cancelled': return '#fadd05';
    default: return '#000';
  }
}

  ngAfterViewInit() {
    this.calendar = new Calendar(this.calendarRef.nativeElement, {
      defaultView: 'month',
      usageStatistics: false,
      useFormPopup: true,
      useDetailPopup: false
    });

    // получаем дату и заставляем Angular применить изменения
    this.updateCurrentMonth();
    this.cd.detectChanges();

    this.loadCalendarEvents();

    this.calendar.on('afterRenderSchedule', () => {
      this.updateCurrentMonth();
      // безопасно освежить view
      this.cd.detectChanges();
    });

    // this.calendar.on('clickEvent', (event: any) => {
    //   const processId = event.schedule.id; // id события в календаре
    //   console.log(processId)
    //   this.openProcessDrawer(processId);
    // });

    this.calendar.on('clickEvent', (event: any) => {
      const processId = event.event.id;
      this.openProcessDrawer(processId);
    });

  }

  private openProcessDrawer(processId: string) {
  // ищем процесс в stages
  for (const stage of this.stages) {
    const process = stage.processes.find(p => String(p.processId) === processId);
    if (process) {
      this.selectedProcess.set(process);
      this.processDrawerVisible.set(true);
      this.cd.detectChanges(); // обновляем Angular view
      break;
    }
  }
}

onProcessUpdated(process: ProcessDetails) {
  // обновляем в локальном массиве stages
  for (const stage of this.stages) {
    const idx = stage.processes.findIndex(p => p.processId === process.processId);
    if (idx !== -1) {
      stage.processes[idx] = { ...process };
    }
  }

  // обновляем событие в календаре
  this.calendar.updateEvent(
    String(process.processId), // id события
    process.stageId,           // calendarId
    {
      start: (process.startDate as Date).toISOString(),
      end: (process.planEndDate as Date).toISOString(),
      title: process.processName,
      backgroundColor: this.getColor(process.status)
    }
  );
}

  onProcessDeleted(processId: string) {
    // удаляем процесс из stages и перерисовываем календарь
    this.stages.forEach(stage => {
      stage.processes = stage.processes.filter(p => p.processId !== processId);
    });
    this.loadCalendarEvents();
    this.closeProcessDrawer();
  }


  onStageChange(stageId: string) {
    this.selectedStageId.set(stageId);
    this.loadCalendarEvents();
  }

  private loadCalendarEvents() {
  if (!this.calendar) return;

  // очищаем календарь
  this.calendar.clear();

  if (!this.stages || this.stages.length === 0) return;

  const filteredStages = this.selectedStageId() === 'All'
    ? this.stages
    : this.stages.filter(s => s.stageId === this.selectedStageId());

  const events = filteredStages.flatMap(stage =>
    stage.processes
      .filter(p => p.startDate && p.planEndDate)
      .map(p => ({
        id: String(p.processId),
        calendarId: stage.stageId,
        title: p.processName,
        category: 'allday',
        start: (p.startDate as Date).toISOString(),
        end: (p.planEndDate as Date).toISOString(),
        backgroundColor: this.getColor(p.status),
        color: '#ffffff' // цвет текста на событии
      }))
  );

  if (events.length) {
    this.calendar.createEvents(events);
  }
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

  closeProcessDrawer = () => {
    this.processDrawerVisible.set(false);
  }
}
