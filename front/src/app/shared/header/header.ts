import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../core/service/auth.service';
import { NotificationSocket } from '../../core/service/notificationSocket.service';
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit{
  private authService = inject(AuthService)
  private notificationSocket = inject(NotificationSocket)
  logged:boolean = false
  ngOnInit(): void {
    const token = localStorage.getItem('token')
    this.logged = token ? true : false 
    if(this.logged && token){
      this.getProfile()
      this.notificationSocket.connect(token)
    }
  }

  getProfile(){
    this.authService.getProfile().subscribe({
      next:(resp) =>{
        if(resp.user) this.logged = true
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  
}
