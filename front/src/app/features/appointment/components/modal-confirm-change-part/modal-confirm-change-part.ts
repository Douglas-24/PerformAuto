import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, Inject } from '@angular/core';
import { AppointmentService } from '../../../../core/service/appointment.service';
import { DinamicModal } from '../../../../shared/dinamic-modal/dinamic-modal';
interface ModalDataUrgentChange {
  pendingParts: any[];
  appointmentId: number;
  carInfo: string;
  mechanicId: number
}
@Component({
  selector: 'app-modal-confirm-change-part',
  imports: [],
  templateUrl: './modal-confirm-change-part.html',
  styleUrl: './modal-confirm-change-part.css'
})
export class ModalConfirmChangePart {
  private appointmentService = inject(AppointmentService);
  private modal = inject(Dialog);

  pendingParts: any[] = [];
  appointmentId: number;
  carInfo: string;

  constructor(
    @Inject(DIALOG_DATA) public data: ModalDataUrgentChange,
    private dialogRef: DialogRef<boolean>
  ) {
    this.pendingParts = data.pendingParts;
    this.appointmentId = data.appointmentId;
    this.carInfo = data.carInfo;
  }

  // Confirma o rechaza un ítem de cambio urgente específico
  async handleConfirmation(partItem: any, confirmed: boolean) {
    const dialogConfirm = this.modal.open(DinamicModal, {
      data: {
        title: confirmed ? 'Confirmar cambio' : 'Rechazar cambio',
        message: confirmed ? 'Esta seguro de que quiere cambiar la pieza, esto conlleva un cambio en la factura final' : 'Esta seguro de rechazar el cambio',
        typeModal: 'Confirmar'
      }
    })

    const actionUser = await dialogConfirm.closed.toPromise()
    if (actionUser) {
      const urgentChangeRecord = partItem.urgentChange;


      const payload = {
        confirmChange: confirmed,
        mechanicId: this.data.mechanicId,
      };
      this.appointmentService.confirmChangePart(urgentChangeRecord.id, payload).subscribe({
        next: () => {
          if (this.pendingParts.every(p => p.urgentChange.clientConfirmed !== null)) {
            this.dialogRef.close(true);
          }
        },
        error: (error) => {
          console.error('Error al actualizar el estado de urgencia:', error);
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
