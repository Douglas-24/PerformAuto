import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, Inject } from '@angular/core';
import { DataServicePartMechanic, StateChangePart } from '../../../../core/interfaces/partTypeService.interface';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppointmentService } from '../../../../core/service/appointment.service';

@Component({
  selector: 'app-modal-change-info-part',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-change-info-part.html',
  styleUrl: './modal-change-info-part.css'
})
export class ModalChangeInfoPart {
  private appointmentService = inject(AppointmentService)
  StateChangePart = StateChangePart
  formChangePart = new FormGroup({
    statePart: new FormControl<StateChangePart | null>(null, Validators.required),
    quantity: new FormControl('1')
  })

  stateChange = [
    { key: StateChangePart.CHANGED, label: 'CAMBIADO' },
    { key: StateChangePart.REVISED, label: 'REVISADO' },
    { key: StateChangePart.NO_CHANGE, label: 'NO CAMBIADO' }
  ];


  stateSelect!: string
  constructor(
    @Inject(DIALOG_DATA) public data: DataServicePartMechanic,
    private dialogRef: DialogRef<boolean>
  ) {}

  selectState() {
    this.stateSelect = this.formChangePart.get('statePart')?.value!
  }

  onCancel() {
    this.dialogRef.close(false)
  }

  updatePartAppointment() {
    const formValue = this.formChangePart.value
    const data: DataServicePartMechanic = {
      appoimentServiceId: this.data.appoimentServiceId,
      partId: this.data.partId,
      quatity: formValue.quantity ? formValue.statePart != StateChangePart.CHANGED ? 0 : parseInt(formValue.quantity) : 0,
      replaced: formValue.statePart == StateChangePart.CHANGED ? true : false,
      statePart: formValue.statePart || StateChangePart.NO_CHANGE
    }

    if (this.data.id) {
      this.appointmentService.updateAppointmentPart(this.data.id, data).subscribe({
        next: (resp) => {
          this.dialogRef.close(true)
        },
        error: (error) => {
          console.log(error);

        }
      })
    }
  }
}
