import { Component, inject } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { ToastServices } from '../../core/service/toast.service';
@Component({
  selector: 'app-forgot-pass',
  imports: [Header, Footer, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './forgot-pass.html',
  styleUrl: './forgot-pass.css'
})
export class ForgotPass {
  private authService = inject(AuthService)
  private toastService = inject(ToastServices)
  email = new FormControl('',[Validators.required, Validators.email])


  sendEmail(){
    const email = {email:this.email.value||''}
    this.authService.forgotPass(email).subscribe({
      next: (resp) => {
        this.toastService.show('Accion exitosa', resp.message, 'success')
      },
      error: (error) =>{
        this.toastService.show('Ha ocurrido un error', error.error, 'error')
      }
    })
  }
}
