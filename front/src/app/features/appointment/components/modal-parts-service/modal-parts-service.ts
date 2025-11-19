import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { DataPartChange, StateChangePart } from '../../../../core/interfaces/partTypeService.interface';
import { ServicesOfferedInterface } from '../../../../core/interfaces/servicesOffered.interfaces';
import { Data } from '@angular/router';
import { DataSelectService } from '../../../../core/interfaces/partTypeService.interface';
@Component({
  selector: 'app-modal-parts-service',
  imports: [],
  templateUrl: './modal-parts-service.html',
  styleUrl: './modal-parts-service.css'
})
export class ModalPartsService {

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

  constructor(
    @Inject(DIALOG_DATA) public data: DataSelectService,
    private dialogRef: DialogRef<DataSelectService>
  ) {

  }

 changeActionPart(part: DataPartChange) {
  switch (part.acctionPart) {
    case StateChangePart.SHOULD_CHANGE:
      part.acctionPart = StateChangePart.REVIEW;
      break;
    case StateChangePart.REVIEW:
      part.acctionPart = StateChangePart.NO_CHANGE;
      break;
    case StateChangePart.NO_CHANGE:
      part.acctionPart = StateChangePart.SHOULD_CHANGE;
      break;
  }  
}



  confirm() {
   this.dialogRef.close(this.data)
  }

  cancel() {
    this.dialogRef.close()
  }
}
