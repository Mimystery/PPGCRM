import { Component, inject } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityService } from '../../data/services/identity-service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-registration-input-by-user',
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule,
    CommonModule],
  templateUrl: './registration-input-by-user.html',
  styleUrl: './registration-input-by-user.less'
})
export class RegistrationInputByUserComponent {
  private fb = inject(NonNullableFormBuilder);
  identityService = inject(IdentityService);

  router = inject(Router)
  regCode = '';

  constructor(private route: ActivatedRoute){
    this.route.queryParams.subscribe(params => {
      const code = params['code']
      this.regCode = code;
    })
  }

  passwordsMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const passwordCtrl = group.get('password');
  const confirmCtrl = group.get('confirmPassword');

  if (!passwordCtrl || !confirmCtrl) return null;

  const password = passwordCtrl.value;
  const confirmPassword = confirmCtrl.value;

  if (password === confirmPassword) {
    if (passwordCtrl.hasError('passwordsMismatch')) {
      passwordCtrl.setErrors(null);
    }
    if (confirmCtrl.hasError('passwordsMismatch')) {
      confirmCtrl.setErrors(null);
    }
    return null;
  } else {
    passwordCtrl.setErrors({ ...passwordCtrl.errors, passwordsMismatch: true });
    confirmCtrl.setErrors({ ...confirmCtrl.errors, passwordsMismatch: true });
    return { passwordsMismatch: true };
  }
  }

  validateForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
    confirmPassword: this.fb.control('', [Validators.required])
  }, {validators: this.passwordsMatchValidator});

  submitForm(): void {
    if (this.validateForm.valid) {
      const email = this.validateForm.controls.email.value;
      const password = this.validateForm.controls.password.value
      this.identityService.registerByUser(this.regCode, email, password).subscribe({
        next: (res) => {
          this.router.navigate(['registrationSuccess'])
        },
        error: (error) => {
          console.error("Error", error)
        }
      });
      this.router.navigate(['registrationSuccess'])
    } else {
      this.validateForm.markAllAsTouched();  // Помечаем все как тронутые, чтобы ошибки отобразились
        this.validateForm.updateValueAndValidity();
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  onBackToLoginClickHandle(){
    this.router.navigate(['login'])
  }

  getEmailError(): string {
  const emailCtrl = this.validateForm.controls.email;
  if (emailCtrl.hasError('required')) {
    return 'Email is required';
  }
  if (emailCtrl.hasError('email')) {
    return 'Please enter a valid email';
  }
  return '';
}

getPasswordError(): string {
  const passwordCtrl = this.validateForm.controls.password;
  if (passwordCtrl.hasError('required')) return 'Password is required';
  if (this.validateForm.hasError('passwordsMismatch'))
    return 'Passwords do not match';
  return '';
}

getConfirmPasswordError(): string {
  const confirmCtrl = this.validateForm.controls.confirmPassword;
  if (confirmCtrl.hasError('required')) return 'Confirm password is required';
  if (this.validateForm.hasError('passwordsMismatch') )
    return 'Passwords do not match';
  return '';
}

}
