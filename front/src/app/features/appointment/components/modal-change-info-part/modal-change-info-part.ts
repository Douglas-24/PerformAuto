import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, Inject } from '@angular/core';
import { ChangeServicePartMechanic, DataServicePartMechanic, DataServicePartUser, StateChangePart } from '../../../../core/interfaces/partTypeService.interface';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppointmentService } from '../../../../core/service/appointment.service';
import { AwsS3Service } from '../../../../core/service/aws-s3.service';
import { ToastServices } from '../../../../core/service/toast.service';

@Component({
  selector: 'app-modal-change-info-part',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-change-info-part.html',
  styleUrl: './modal-change-info-part.css'
})
export class ModalChangeInfoPart {
  private appointmentService = inject(AppointmentService)
  private awsS3 = inject(AwsS3Service)
  private toast = inject(ToastServices)
  StateChangePart = StateChangePart
  formChangePart = new FormGroup({
    statePart: new FormControl<StateChangePart | null>(null, Validators.required),
    quantity: new FormControl('1'),
    urgentReason: new FormControl<string | null>(null),
  })

  selectedFile?: File;

  stateChange = [
    { key: StateChangePart.CHANGED, label: 'CAMBIADO' },
    { key: StateChangePart.REVISED, label: 'REVISADO' },
    { key: StateChangePart.NO_CHANGE, label: 'NO CAMBIADO' },
    { key: StateChangePart.CHANGE_URGENT, label: 'CAMBIO URGENTE' }
  ];

  isUrgentChangeResolved: boolean = false;
  stateSelect: StateChangePart | null = null;
  constructor(
    @Inject(DIALOG_DATA) public data: DataServicePartUser,
    private dialogRef: DialogRef<boolean>
  ) {
    console.log(data);
    if (this.data.urgentChangePart && this.data.urgentChangePart.length > 0) {
      const latestUrgentChange = this.data.urgentChangePart[0];

      if (latestUrgentChange.clientConfirmed !== null) {
        this.isUrgentChangeResolved = true;
      }
    }

    this.stateChange = [
      { key: StateChangePart.CHANGED, label: 'CAMBIADO' },
      { key: StateChangePart.REVISED, label: 'REVISADO' },
      { key: StateChangePart.NO_CHANGE, label: 'NO CAMBIADO' },
    ];
    if (!this.isUrgentChangeResolved) {
      this.stateChange.push({ key: StateChangePart.CHANGE_URGENT, label: 'CAMBIO URGENTE' });
    }
    this.formChangePart.get('statePart')?.valueChanges.subscribe(value => {
      this.selectState(value);
    });
  }

  selectState(state: StateChangePart | null) {
    this.stateSelect = state;
    const reasonControl = this.formChangePart.get('urgentReason');

    if (state === this.StateChangePart.CHANGE_URGENT) {
      reasonControl?.setValidators(Validators.required);
    } else {
      reasonControl?.clearValidators();
      reasonControl?.setValue(null);
    }
    reasonControl?.updateValueAndValidity();
  }

  onCancel() {
    this.dialogRef.close(false)
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return
    this.selectedFile = file;
  }

  updatePartAppointment() {
    const formValue = this.formChangePart.value
    const data: ChangeServicePartMechanic = {
      appoimentServiceId: this.data.appoimentServiceId,
      partId: this.data.partId,
      quantity: formValue.quantity ? formValue.statePart != StateChangePart.CHANGED ? 0 : parseInt(formValue.quantity) : 0,
      replaced: formValue.statePart == StateChangePart.CHANGED ? true : false,
      statePart: formValue.statePart || StateChangePart.NO_CHANGE,
    }
    console.log(data);
    
    if (this.selectedFile && formValue.statePart == StateChangePart.CHANGE_URGENT) {
      this.awsS3.uploadFile(this.selectedFile).subscribe({
        next: (resp) => {
          data.urlImg = resp.data.url
          data.mechanicMessage = formValue.urgentReason
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
          this.toast.show('Mensaje enviado', 'Se le a enviado una notificación al cliente', 'info')
        }
      })
    } else {
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
}
