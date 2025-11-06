import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../core/service/auth.service';
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit{
  private authService = inject(AuthService)
  logged:boolean = false
  ngOnInit(): void {
    this.logged =localStorage.getItem('token') ? true : false 
    this.getProfile()
    
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
