import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-registration-success',
  imports: [NzButtonModule, NzResultModule],
  templateUrl: './registration-success.html',
  styleUrl: './registration-success.less'
})
export class RegistrationSuccessComponent {
  router = inject(Router)

  onGoLoginButtonClickHandle(){
    this.router.navigate(['login'])
  } 
}
