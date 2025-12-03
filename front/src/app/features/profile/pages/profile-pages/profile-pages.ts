import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/service/auth.service';
import { Employee, Role, User } from '../../../../core/interfaces/user.interfaces';
@Component({
  selector: 'app-profile-pages',
  imports: [],
  templateUrl: './profile-pages.html',
  styleUrl: './profile-pages.css'
})
export class ProfilePage {
  private authService = inject(AuthService)
  user:User | null = null
  employee:Employee |null = null
  ngOnInit(){
    this.getProfile()
  }
  
  getProfile(){
    this.authService.getProfile().subscribe({
      next:(resp) =>{
        if(resp.user.rol == Role.CLIENT){
          this.user = resp.user
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
