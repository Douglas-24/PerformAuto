import { Component, inject, Input, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../core/service/appointment.service';
import { AuthService } from '../../../../core/service/auth.service';
import { AppointmentUserInterface } from '../../../../core/interfaces/appointment.interface';
import { CommonModule } from "@angular/common"
import { RouterLink } from '@angular/router';
import { Employee, User } from '../../../../core/interfaces/user.interfaces';

@Component({
  selector: 'app-appointment-user',
  imports: [CommonModule, RouterLink],
  templateUrl: './appointment-user.html',
  styleUrl: './appointment-user.css'
})
export class AppointmentUser implements OnInit {
  @Input() user!:User
  private appointmentService = inject(AppointmentService)
  allAppointmet: AppointmentUserInterface[] = []

  ngOnInit(): void {
    if(this.user && this.user.id) this.getAllApointment(this.user.id)
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
