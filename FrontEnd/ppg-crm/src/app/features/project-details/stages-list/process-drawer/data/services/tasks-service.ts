import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  http = inject(HttpClient)

  addTask(processId: string, taskName: string){
    const taskCreateBody = {taskName: taskName};
    return this.http.post(`https://localhost:7189/api/Tasks/AddTaskByProcessId/${processId}`, taskCreateBody);
  }

  removeTask(){

  }

}
