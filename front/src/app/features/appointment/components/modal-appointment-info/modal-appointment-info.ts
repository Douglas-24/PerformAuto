import { Component, Inject, inject } from '@angular/core';
import { AppointmentService } from '../../../../core/service/appointment.service';
import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DataSelectService, DataServicePartMechanic, ServiceParts } from '../../../../core/interfaces/partTypeService.interface';
import { StateServie } from '../../../../core/interfaces/appointment.interface';
import { Separator } from "../../../../shared/separator/separator";
import { ModalChangeInfoPart } from '../modal-change-info-part/modal-change-info-part';
import { DinamicModal } from '../../../../shared/dinamic-modal/dinamic-modal';
import { NotificationSocket } from '../../../../core/service/notificationSocket.service';
import { InvoiceModal } from '../../../invoice/components/invoice-modal/invoice-modal';
@Component({
  selector: 'app-modal-appointment-info',
  imports: [Separator],
  templateUrl: './modal-appointment-info.html',
  styleUrl: './modal-appointment-info.css'
})
export class ModalAppointmentInfo {
  private appointmentService = inject(AppointmentService)
  serviceParts: ServiceParts[] = []
  private modal = inject(Dialog)
  private notificationSocket = inject(NotificationSocket);
  constructor(
    @Inject(DIALOG_DATA) public data: number,
    private dialogRef: DialogRef
  ) {
    this.getServicePart()
    this.listenForRefresh();
  }

  classPartsLabel = {
    SHOULD_CHANGE: {
      classBorder: "border-red-500",
      classMessage: "bg-red-300 px-3 text-red-600",
      message: "Cambiar"
    },
    REVIEW: {
      classBorder: "border-cyan-500",
      classMessage: "bg-cyan-300 px-3 text-cyan-600",
      message: "Revisar"
    },
    NO_CHANGE: {
      classBorder: "border-green-500",
      classMessage: "bg-green-300 px-3 text-green-600",
      message: "No cambiar"
    },
    CHANGED: {
      classBorder: "border-yellow-500",
      classMessage: "bg-yellow-300 px-3 text-yellow-600",
      message: "Cambiado"
    },
    REVISED: {
      classBorder: "border-purple-500",
      classMessage: "bg-purple-300 px-3 text-purple-600",
      message: "Revisado"
    },
    CHANGE_URGENT: {
      classBorder: "border-orange-600",
      classMessage: "bg-orange-300 px-3 text-orange-700 font-bold",
      message: "Cambio urgente"
    }
  }

  getServicePart() {
    this.appointmentService.getServicesPartsAppointment(this.data).subscribe({
      next: (resp) => {
        this.serviceParts = resp.data        
      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  listenForRefresh() {
        this.notificationSocket.onRefreshData().subscribe(() => {
            this.getServicePart(); 
        });
    }

  async openModalChangeInfo(partService: DataServicePartMechanic) {
    const dialog = this.modal.open(ModalChangeInfoPart, {
      data: partService
    })
    const dialogClose = await dialog.closed.toPromise()
    if (dialogClose) {
      this.getServicePart()
    }
  }

  async endAppointment() {
    const dialog = this.modal.open(InvoiceModal,{
      data: this.data
    })
    const dialogClose = await dialog.closed.toPromise()
    if (dialogClose) {
      this.dialogRef.close(true)
      // this.appointmentService.updateAppointment(this.data, { state: StateServie.FINISH }).subscribe({
      //   next: (resp) => {
      //   },
      //   error: (error) => {
      //     console.log(error);

      //   }
      // })
    }
  }

  onCancel() {
    this.dialogRef.close()
  }
}
