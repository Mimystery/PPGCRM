import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IdentityService } from '../../data/services/identity-service';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule,
    CommonModule
  ],
  templateUrl: './registration.html',
  styleUrl: './registration.less'
})
export class RegistrationComponent {
  private fb = inject(NonNullableFormBuilder);
  identityService = inject(IdentityService)

  private cdr = inject(ChangeDetectorRef);
  router = inject(Router)

  serverErrorMessage = signal('');

  validateForm = this.fb.group({
    code: this.fb.control('', {
    validators: [Validators.required, Validators.minLength(32), Validators.maxLength(32)],
    asyncValidators: [this.codeValidator()],
  }),
  });


  codeValidator() {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return new Observable(observer => {
      this.identityService.checkPendingUser(control.value).subscribe({
        next: () => {
          observer.next(null); 
          observer.complete();
        },
        error: () => {
          observer.next({ invalidCode: true });
          observer.complete();
        }
      });
    });
  };
}

  submitForm(): void {
    if (this.validateForm.valid) {
      const code = this.validateForm.controls.code.value;
      console.log('Form submitted', this.validateForm.value);
      this.router.navigate(['registrationInput'], { queryParams: {code}})
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.markAsTouched();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  onBackToLoginClickHandle(){
    this.router.navigate(['login'])
  }
}
//f6449c9546a64a37bb573ad33b3f271c