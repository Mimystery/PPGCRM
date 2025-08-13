import { Component, inject } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Router } from '@angular/router';
import { IdentityService } from '../../data/services/identity-service';
import { error } from '@ant-design/icons-angular';
import { CommonModule } from '@angular/common';
import { Observable, Observer } from 'rxjs';

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
    email: this.fb.control('', {
      validators: [Validators.required],
    }),
    password: this.fb.control('', {
      validators: [Validators.required],
    }),
    remember: this.fb.control(true)
  });

submitForm(): void {
  Object.values(this.validateForm.controls).forEach(control => {
    control.markAsDirty();
    control.updateValueAndValidity();
  });

  if (this.validateForm.valid) {
    const payload = {
      email: this.validateForm.controls.email.value,
      password: this.validateForm.controls.password.value
    };

    this.identityService.login(payload).subscribe({
      next: (res) => {
        this.router.navigate([''])
      },
      error: () => {
        this.validateForm.get('email')?.setErrors({ invalidData: true });
        this.validateForm.get('password')?.setErrors({ invalidData: true });
      }
    });
  }
}

  onClickRegistrationCodeHandle(){
    this.router.navigate(['/registration'])
  }
}
