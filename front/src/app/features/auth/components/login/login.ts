import { Component, inject, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { DinamicForm } from "../../../../shared/dinamic-form/dinamic-form";
import { ConfigFieldsForm } from '../../../../core/interfaces/configFiledsForm';
import { AuthService } from '../../../../core/service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastServices } from '../../../../core/service/toast.service';

interface credentials {
    email: string,
    dni ?: string,
    password: string
}
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, DinamicForm, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  @Output() goRegister = new EventEmitter<boolean>()

  private authService = inject(AuthService)
  private route = inject(Router)
  private toast = inject(ToastServices)

  loginForm = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)])
  })

   configField: ConfigFieldsForm[] = [
    { key: 'email', label: 'Correo electronico', type: 'email' },
    { key: 'password', label: 'Contraseña', type: 'password' },
  ]

  login(){
    const credentials:credentials = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    }
    this.authService.login(credentials).subscribe({
      next: (resp) => {
        if(resp.data.access_token){
          localStorage.setItem('token', resp.data.access_token)
          this.route.navigate(['/profile'])
        }
      },
      error: (error)=>{
        console.log(error);
        this.toast.show('Error de inicio de sesion', 'Email o contrasena incorrectas', 'error', 4000)
        
      }
    })
  }

  goToFormRegister(){
    this.goRegister.emit(true)
  }
}
