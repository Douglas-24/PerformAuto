import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { DataServicePartMechanic } from '../../../../core/interfaces/partTypeService.interface';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-change-info-part',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-change-info-part.html',
  styleUrl: './modal-change-info-part.css'
})
export class ModalChangeInfoPart {

  formChangePart = new FormGroup({
    statePart: new FormControl('', Validators.required),
    quantity: new FormControl('1')
  })

  stateChange = [
    { key: 'CHANGE', label: 'CAMBIADO' },
    { key: 'REVISED', label: 'REVISADO' },
    { key: 'NO_CHANGE', label: 'NO CAMBIADO' }
  ];

  stateSelect!:string
  constructor(
    @Inject(DIALOG_DATA) public data: DataServicePartMechanic,
    private dialogRef: DialogRef<boolean>
  ) {
    console.log(data);
  }

  selectState(){
    this.stateSelect = this.formChangePart.get('statePart')?.value!
  }

  onCancel(){
    this.dialogRef.close(false)
  }

}
