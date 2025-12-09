import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Appointment, StateServie } from '../../../../core/interfaces/appointment.interface';
import { AppointmentService } from '../../../../core/service/appointment.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
@Component({
  selector: 'app-invoice-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './invoice-modal.html',
  styleUrl: './invoice-modal.css'
})
export class InvoiceModal {
  private appointmentService = inject(AppointmentService)
  observationForm = new FormGroup({
    observation: new FormControl<string | null>(null),
  })
  constructor(
    @Inject(DIALOG_DATA) public data: number,
    private dialogRef: DialogRef
  ) {  }

  cancel(){
    this.dialogRef.close(false)
  }

  confirm(){
    const observationValue = this.observationForm.value
    console.log(observationValue);
    const data:Partial<Appointment> = {
      state: StateServie.FINISH,
      notes: observationValue.observation
    }
    this.appointmentService.updateAppointment(this.data,data).subscribe({
      next: (resp)=>{
        console.log(resp);
        this.dialogRef.close(true)
      }
    })

    
  }
}
