import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MechanicSlot } from '../../../../core/interfaces/appointment.interface';
import { CommonModule } from '@angular/common';
import { Separator } from "../../../../shared/separator/separator";
@Component({
  selector: 'app-modal-select-hour',
  imports: [CommonModule, Separator],
  templateUrl: './modal-select-hour.html',
  styleUrl: './modal-select-hour.css'
})
export class ModalSelectHour {
 constructor(
    @Inject(DIALOG_DATA) public data:{mechanicSlot: MechanicSlot[], date:string},
    private dialogRef: DialogRef<{date:Date, mechanicId:number} | null>
 ){}



 selectHour(hourSelected:Date, mechanicId:number){
  const data: {date:Date, mechanicId:number} = {
    date: new Date(hourSelected),
    mechanicId:mechanicId
  }
  
  this.dialogRef.close(data)
 }


 closeModal(){
  this.dialogRef.close(null)
 }
}
