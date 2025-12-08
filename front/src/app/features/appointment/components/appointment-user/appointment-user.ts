import { Component, inject, Input, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../core/service/appointment.service';
import { AuthService } from '../../../../core/service/auth.service';
import { AppointmentUserInterface } from '../../../../core/interfaces/appointment.interface';
import { CommonModule } from "@angular/common"
import { RouterLink } from '@angular/router';
import { Employee, User } from '../../../../core/interfaces/user.interfaces';
import { Dialog } from '@angular/cdk/dialog';
import { ModalConfirmChangePart } from '../modal-confirm-change-part/modal-confirm-change-part';
import { NotificationSocket } from '../../../../core/service/notificationSocket.service';
interface ModalDataUrgentChange {
  pendingParts: any[];
  appointmentId: number;
  carInfo: string;
  mechanicId: number
}
@Component({
  selector: 'app-appointment-user',
  imports: [CommonModule, RouterLink],
  templateUrl: './appointment-user.html',
  styleUrl: './appointment-user.css'
})
export class AppointmentUser implements OnInit {
  @Input() user!: User
  private appointmentService = inject(AppointmentService)
  private dialog = inject(Dialog)
  private notificationSocket = inject(NotificationSocket)
  allAppointmet: AppointmentUserInterface[] = []

  ngOnInit(): void {
    if (this.user && this.user.id){
      this.getAllApointment(this.user.id)
      this.listenForRefresh(this.user.id)
    } 
    
  }

  listenForRefresh(id_user:number) {
        this.notificationSocket.onRefreshData().subscribe(() => {
            console.log(`[SOCKET] Recepción de 'refreshData'. Refrescando citas...`);
            this.getAllApointment(id_user);
        }, (error) => {
          console.error("[SOCKET ERROR] Error en la suscripción a 'refreshData':", error);
        });
    }

  getAllApointment(id_user: number) {
    this.appointmentService.getAllAppointmentUser(id_user).subscribe({
      next: (resp) => {
        this.allAppointmet = resp.data
      },
      error: (error) => {
        console.log(error);

      }
    })
  }
  getUrgentPartsCount(appointment: AppointmentUserInterface): number {
    let count = 0;

    if (appointment.services) {
      for (const service of appointment.services) {
        if (service.parts_used) {
          for (const part of service.parts_used) {
            if (part.urgentChangePart && part.urgentChangePart.length > 0) {
              const latestUrgentChange = part.urgentChangePart[0]
              if (part.statePart === 'CHANGE_URGENT' && latestUrgentChange.clientConfirmed === null) {
                count++;
              }
            }
          }
        }
      }
    }
    return count;
  }
  collectAllPendingUrgentParts(appointment: AppointmentUserInterface): any[] {
    const pendingParts: any[] = [];

    for (const service of appointment.services) {
      for (const part of service.parts_used) {
        if (part.statePart === 'CHANGE_URGENT' &&
          part.urgentChangePart &&
          part.urgentChangePart.length > 0
        ) {
          const urgentRecord = part.urgentChangePart[0];
          if (urgentRecord.clientConfirmed === null) {
            pendingParts.push({
              partName: part.part?.name || 'Pieza Desconocida',
              partReference: part.part?.reference,
              serviceName: service.services.name,
              urgentChange: urgentRecord,
              appoimentServicePartId: part.id
            });
          }
        }
      }
    }
    return pendingParts;
  }
  openUrgentChangeModal(appointment: AppointmentUserInterface) {
    const pendingUrgentParts = this.collectAllPendingUrgentParts(appointment);
    const modalData: ModalDataUrgentChange = {
      pendingParts: pendingUrgentParts,
      appointmentId: appointment.id,
      carInfo: `${appointment.car.brand} ${appointment.car.model}`,
      mechanicId: appointment.mechanicId
    };

    this.dialog.open(ModalConfirmChangePart, {
      width: '750px',
      data: modalData,
    }).closed.subscribe(result => {
      if (result && this.user.id) {
        this.getAllApointment(this.user.id);
      }
    });
  }
}
