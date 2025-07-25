import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';


@Component({
  selector: 'app-login',
  imports:[NzFormModule, NzCardModule, FormsModule],
  templateUrl: './login.html',
})

export class LoginComponent {
  validateForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submitForm(): void {
    this.submitted = true;
    }
}
