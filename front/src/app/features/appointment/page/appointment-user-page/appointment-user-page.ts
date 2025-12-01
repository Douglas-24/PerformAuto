import { Component, inject, OnInit } from '@angular/core';
import { AppointmentUser } from "../../components/appointment-user/appointment-user";
import { AppointmentMechanic } from '../../components/appointment-mechanic/appointment-mechanic';
import { AuthService } from '../../../../core/service/auth.service';
import { Employee, User } from '../../../../core/interfaces/user.interfaces';
@Component({
  selector: 'app-appointment-user-page',
  imports: [AppointmentUser, AppointmentMechanic],
  templateUrl: './appointment-user-page.html',
  styleUrl: './appointment-user-page.css'
})
export class AppointmentUserPage implements OnInit{
  user!:User | Employee 
  private authService = inject(AuthService)

  ngOnInit(): void {
    this.getIdUser()
  }
  getIdUser() {
    this.authService.getProfile().subscribe({
      next: (resp) => {
        this.user = resp.user
      }
    })
  }
}
