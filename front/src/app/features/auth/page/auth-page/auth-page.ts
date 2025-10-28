import { Component } from '@angular/core';
import { Login } from '../../components/login/login';
import { Register } from '../../components/register/register';
import { Header } from "../../../../shared/header/header";
@Component({
  selector: 'app-auth-page',
  imports: [Login, Register],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.css'
})
export class AuthPage {
  showFormRegister:boolean = false
  showFormLogin:boolean = true

  showForm(show:boolean){
    this.showFormLogin = !show
    this.showFormRegister = show
  }
}
