import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzResultComponent } from "ng-zorro-antd/result";

@Component({
  selector: 'app-create-user-success',
  imports: [NzResultComponent, NzButtonModule, CommonModule],
  templateUrl: './create-user-success.html',
  styleUrl: './create-user-success.less'
})
export class CreateUserSuccessComponent {
  router = inject(Router)
  message = inject(NzMessageService);
  
  regCode = ''
  registrationCodeText = '';

  constructor() {
  const navigation = this.router.getCurrentNavigation();
  const state = navigation?.extras.state as { regCode?: string };
  if (state?.regCode) {
    this.regCode = state.regCode;
    this.registrationCodeText = `You have successfully registered new user. Registration code: "${this.regCode}".`;
  }
}

  onGoBackButtonClickHandle(){
    this.router.navigate(['team'])
  }

  copyCode() {
  navigator.clipboard.writeText(this.regCode)
    .then(() => this.message.success('Registration code copied!'))
    .catch(() => this.message.error('Failed to copy'));
}
}
