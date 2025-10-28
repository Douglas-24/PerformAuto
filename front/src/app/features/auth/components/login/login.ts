import { Component, inject, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
interface credentials {
    email: string,
    dni ?: string,
    password: string
}
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
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
