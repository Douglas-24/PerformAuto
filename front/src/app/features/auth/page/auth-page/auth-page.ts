import { Component, inject, OnInit } from '@angular/core';
import { Login } from '../../components/login/login';
import { Register } from '../../components/register/register';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth-page',
  imports: [Login, Register],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.css'
})
export class AuthPage implements OnInit{
  private router = inject(Router)

  showFormRegister:boolean = false
  showFormLogin:boolean = true

  showForm(show:boolean){
    this.showFormLogin = !show
    this.showFormRegister = show
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token') ? true : false
    if(token){
      this.router.navigate(['profile'])
    }
  }
}
