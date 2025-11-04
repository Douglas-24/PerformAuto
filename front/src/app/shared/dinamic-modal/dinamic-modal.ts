import { Component, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog'
import { DinamicForm } from '../dinamic-form/dinamic-form';
import { FormGroup } from '@angular/forms';
import { ConfigFieldsForm } from '../../core/interfaces/configFiledsForm';
interface dataModal {
  title:string,
  message?: string,
  typeModal: 'Crear' | 'Confirmar' | 'Actualizar'
  formGroup?:FormGroup,
  configFields?: ConfigFieldsForm[],
  updateDataForm?: any,
}
@Component({
  selector: 'app-dinamic-modal',
  imports: [DinamicForm],
  templateUrl: './dinamic-modal.html',
  styleUrl: './dinamic-modal.css'
})
export class DinamicModal{
  constructor(
    @Inject(DIALOG_DATA) public data: dataModal,
    private dialogRef: DialogRef<boolean>
  ) {
    
  }

  confirm() {
    this.dialogRef.close(true)
  }

  cancel() {
    this.dialogRef.close(false)
  }
} 
