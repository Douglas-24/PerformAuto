import { Component, inject, Input, OnInit } from '@angular/core';
import { Employee, User } from '../../../../core/interfaces/user.interfaces';
import { AppointmentService } from '../../../../core/service/appointment.service';
import { AppointmentUserInterface } from '../../../../core/interfaces/appointment.interface';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { ModalAppointmentInfo } from '../modal-appointment-info/modal-appointment-info';
import { StateServie } from '../../../../core/interfaces/appointment.interface';
@Component({
  selector: 'app-appointment-mechanic',
  imports: [CommonModule],
  templateUrl: './appointment-mechanic.html',
  styleUrl: './appointment-mechanic.css'
})
export class AppointmentMechanic implements OnInit {
  @Input() user!: Employee
  private appointmentService = inject(AppointmentService)
  allAppointmet: AppointmentUserInterface[] = []
  private modal = inject(Dialog)
  stateAppointment = StateServie
  ngOnInit(){
    this.getAllAppointmentMechanic()
  }

  getAllAppointmentMechanic(){
    if(this.user.id){
      this.appointmentService.getAllAppointmentMechanic(this.user.id).subscribe({
        next:(resp)=>{
          this.allAppointmet = resp.data
          
        },
        error:(error)=>{
          console.log(error);
          
        }
      })
    }
  }

  async openModal(id_appoiment:number){
    const dialogRef = this.modal.open(ModalAppointmentInfo, {
      data: id_appoiment
    })

    const dialogClose = await dialogRef.closed.toPromise() 
    if(dialogClose){
      this.getAllAppointmentMechanic()
    }
  }
}
