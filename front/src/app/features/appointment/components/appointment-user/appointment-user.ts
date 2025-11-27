import { Component, inject, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../core/service/appointment.service';
import { AuthService } from '../../../../core/service/auth.service';
import { AppointmentUserInterface } from '../../../../core/interfaces/appointment.interface';
import { CommonModule } from "@angular/common"
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-appointment-user',
  imports: [CommonModule, RouterLink],
  templateUrl: './appointment-user.html',
  styleUrl: './appointment-user.css'
})
export class AppointmentUser implements OnInit {

  private appointmentService = inject(AppointmentService)
  private authService = inject(AuthService)
  allAppointmet: AppointmentUserInterface[] = []

  ngOnInit(): void {
    this.getIdUser()
  }

  getIdUser() {
    this.authService.getProfile().subscribe({
      next: (resp) => {
        if (resp.user.id) this.getAllApointment(resp.user.id)
      }
    })
  }
  getAllApointment(id_user: number) {
    this.appointmentService.getAllAppointmentUser(id_user).subscribe({
      next: (resp) => {
        this.allAppointmet = resp.data
        console.log(resp.data);
      },
      error: (error) => {
        console.log(error);

      }
    })
  }
}
