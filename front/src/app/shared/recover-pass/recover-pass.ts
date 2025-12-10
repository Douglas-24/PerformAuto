import { Component, inject, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule,FormsModule, FormGroup } from '@angular/forms';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { AuthService } from '../../core/service/auth.service';
import { ToastServices } from '../../core/service/toast.service';
import { Router, ActivatedRoute , RouterLink } from '@angular/router';

@Component({
  selector: 'app-recover-pass',
  imports: [Header, Footer, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './recover-pass.html',
  styleUrl: './recover-pass.css'
})
export class RecoverPass {
  private authService = inject(AuthService)
  private activateRoute = inject(ActivatedRoute)
  private toastService = inject(ToastServices)

  passwordReset:boolean = false
  resetForm = new FormGroup({
    password: new FormControl('',[Validators.required]),
    confirmPassword: new FormControl('',[Validators.required])
  })

  resetPassword(){
    const token = this.activateRoute.snapshot.queryParamMap.get('token')
    const dataForm = this.resetForm.value
    const dataReset = {
      token: token || '',
      newPassword: dataForm.password || ''
    }

    this.authService.recoverPass(dataReset).subscribe({
      next: (resp) => {
        this.passwordReset = true
        this.toastService.show('Restablecimiento Correcto', resp.message,'success')
      },
      error: (error)=> {
        this.toastService.show('Ha ocurrido un error', 'No se a podido restablecer su contraseña','error')
      }
    })
  }
}
