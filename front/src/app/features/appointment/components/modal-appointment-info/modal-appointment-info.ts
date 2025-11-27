import { Component, Inject, inject } from '@angular/core';
import { AppointmentService } from '../../../../core/service/appointment.service';
import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DataSelectService, DataServicePartMechanic, ServiceParts } from '../../../../core/interfaces/partTypeService.interface';
import { Separator } from "../../../../shared/separator/separator";
import { ModalChangeInfoPart } from '../modal-change-info-part/modal-change-info-part';
@Component({
  selector: 'app-modal-appointment-info',
  imports: [Separator],
  templateUrl: './modal-appointment-info.html',
  styleUrl: './modal-appointment-info.css'
})
export class ModalAppointmentInfo {
  private appointmentService = inject(AppointmentService)
  serviceParts:ServiceParts[] = []
  private modal = inject(Dialog)
  constructor(
    @Inject(DIALOG_DATA) public data: number,
    private dialogRef: DialogRef
  ) {
    this.getServicePart()
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
  }

  getServicePart(){
    this.appointmentService.getServicesPartsAppointment(this.data).subscribe({
      next: (resp)=> {
        this.serviceParts = resp.data
        console.log(resp.data);
        
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }

  openModalChangeInfo(partService: DataServicePartMechanic){
    this.modal.open(ModalChangeInfoPart, {
      data: partService
    })
  }
}
