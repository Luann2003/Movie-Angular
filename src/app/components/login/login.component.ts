import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../enviroments/enviroment';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface LoginForm{
  email: FormControl,
  password: FormControl;
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup<LoginForm>;

  constructor(
    private toastService: ToastrService,
    private route: Router,
    private loginService: LoginService
  ) {this.loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })}

  submit(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () =>{
        this.toastService.success("Login realizado com sucesso!"); 
        this.route.navigate(['/movies']);
      },
      error: (err) => {
        if (err.status === 400) {
          this.toastService.error("Usuário ou senha incorretos.");
        }else if (err.status === 401) {
          this.toastService.error("Credenciais invalida");
        } 
        else if (err.status === 500) {
          this.toastService.error("Erro no servidor. Tente novamente mais tarde.");

        } else {
          this.toastService.error("Erro inesperado! Tente novamente.");
        }
      }
    })
    this.loginForm.reset();
  }

}
