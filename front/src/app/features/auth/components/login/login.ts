import { Component, inject, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { DinamicForm } from "../../../../shared/dinamic-form/dinamic-form";
import { ConfigFieldsForm } from '../../../../core/interfaces/configFiledsForm';

interface credentials {
    email: string,
    dni ?: string,
    password: string
}
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, DinamicForm],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  @Output() goRegister = new EventEmitter<boolean>()

  private authService = inject(AuthService)

  loginForm = new FormGroup({
    email:new FormControl(''),
    password: new FormControl('')
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
    this.authService.login(credentials)
    
  }

  goToFormRegister(){
    this.goRegister.emit(true)
  }
}
