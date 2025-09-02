import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../../core/auth/data/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectUserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  getUsers(): User[] {
    return this.usersSubject.value;
  }

  setUsers(users: User[]){
    this.usersSubject.next(users);
  }

  addUser(user: User){
    if(!this.getUsers().some(u => u.userId === user.userId)){
      this.usersSubject.next([...this.getUsers(), user]);
    }
  }

  removeUser(userId: string){
    this.usersSubject.next(
      this.getUsers().filter(u => u.userId !== userId)
    )
  }
}
