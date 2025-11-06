import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute , RouterLink } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
@Component({
  selector: 'app-verify-account-page',
  imports: [RouterLink],
  templateUrl: './verify-account-page.html',
  styleUrl: './verify-account-page.css'
})
export class VerifyAccountPage implements OnInit {
  message = 'Verificando cuenta'
  showBoton = false
  private route = inject(Router)
  private activateRoute = inject(ActivatedRoute)
  private authService = inject(AuthService)
  ngOnInit(): void {
    const token = this.activateRoute.snapshot.queryParamMap.get('token')
    if(token){
      this.authService.verifyAccount(token).subscribe({
        next:(resp)=>{
          if(resp.statusCode == 200){
            this.message = resp.message
            this.showBoton = true
          }
        }
      })
    }
  }

}
