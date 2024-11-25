import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormRecord } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl,
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule, // Add this import for Reactive Forms
    PrimaryInputComponent
  ],
  providers: [
    LoginService,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'] // Fix typo: `styleUrl` to `styleUrls`
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit(){
    this.loginService.login(this.signupForm.value.email, this.signupForm.value.password).subscribe ({
    next: () => this.toastService.success("Login feito com sucesso!"),
    error: () =>  this.toastService.error("Erro inesperado! Tente novamente mais tarde")
  });
}

  navigate(){
    this.router.navigate(["signup"])
  }
}
