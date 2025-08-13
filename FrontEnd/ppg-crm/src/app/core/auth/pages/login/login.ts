import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Router } from '@angular/router';
import { IdentityService } from '../../data/services/identity-service';
import { error } from '@ant-design/icons-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule, 
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.less',
})

export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  identityService = inject(IdentityService)
  router = inject(Router)

  validateForm = this.fb.group({
    email: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    remember: this.fb.control(true)
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      const payload = {
        email: this.validateForm.controls.email.value,
        password: this.validateForm.controls.password.value
      }
      console.log('submit', payload);
      this.identityService.login(payload).subscribe({
        next: (resp) => {
          console.log('Back:', resp)
        },
        error: (error) => {
          console.log('Error:', error)
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  onClickRegistrationCodeHandle(){
    this.router.navigate(['/registration'])
  }
}
