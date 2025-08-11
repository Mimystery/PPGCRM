import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedProjectService {

  public selectedProjectName = signal<string | null>("a");
  public selectedProjectId = signal<string | null>(null);
  /*
  *TODO: HTTP ЗАПРОС ПО АЙДІ ПРОЕКТУ КОЛИ ВИБИРАЄМО
   */
}
