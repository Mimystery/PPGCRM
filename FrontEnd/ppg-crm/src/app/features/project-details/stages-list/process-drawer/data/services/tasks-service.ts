import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  http = inject(HttpClient)

  addTask(processId: string, taskName: string){
    const taskCreateBody = {taskName: taskName};
    return this.http.post<Task>(`https://localhost:7189/api/Tasks/AddTaskByProcessId/${processId}`, taskCreateBody);
  }

  removeTask(){

  }

}
