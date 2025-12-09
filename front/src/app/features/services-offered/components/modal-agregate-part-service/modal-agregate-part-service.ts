import { Component, Inject, inject } from '@angular/core';
import { PartsService } from '../../../../core/service/parts.service';
import { Parts, PartUsed } from '../../../../core/interfaces/parts.interfaces';
import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { PartServiceTypeService } from '../../../../core/service/part-service-type.service';
import { PartDataForService, partTypeService, ServiceSelectPart } from '../../../../core/interfaces/partTypeService.interface';
import { Separator } from "../../../../shared/separator/separator";
import { DinamicModal } from '../../../../shared/dinamic-modal/dinamic-modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigFieldsForm } from '../../../../core/interfaces/configFiledsForm';
import { ServicesOffered } from '../../../../core/service/services-offered.service';
import { ToastServices } from '../../../../core/service/toast.service';

@Component({
  selector: 'app-modal-agregate-part-service',
  imports: [Separator],
  templateUrl: './modal-agregate-part-service.html',
  styleUrl: './modal-agregate-part-service.css'
})
export class ModalAgregatePartService {
  private partsSevice = inject(PartsService)
  private modal = inject(Dialog)
  private toast = inject(ToastServices)
   private partServices = inject(PartServiceTypeService)
  private servicesPartService = inject(ServicesOffered)
  allParts: partTypeService[] = []
  availableParts: PartUsed[] = [];

  constructor(
    @Inject(DIALOG_DATA) public data: ServiceSelectPart,
    private dialogRef: DialogRef<boolean>
  ) {
    console.log(data);

  }

  ngOnInit(): void {
    this.getAllPartSevice()
    this.getAllParts()
  }

    getAllPartSevice(){
      if(this.data.id){
        this.partServices.getAllPartTypeService(this.data.id).subscribe({
          next: (resp) =>{
            this.allParts = resp.data.parts
          },
          error: (error) =>{
            console.log(error);
            
          }
        })
      }
    }
  

  getAllParts() {
    this.partsSevice.getAllParts().subscribe({
      next: (resp) => {
        const allFetchedParts = resp.data as PartUsed[];

        const addedPartIds = new Set(this.data.parts.map(p => p.partId));

        this.availableParts = allFetchedParts
          .filter(part => !addedPartIds.has(part.id))
          .map(part => ({
            ...part,
            isSelected: false,
            quantity: 1,
            changeRecomended: true
          }));

      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  async addPartService(part: PartUsed) {
    const formQuantity = new FormGroup({
      quantity: new FormControl(1, [Validators.required, Validators.min(1)])
    })
    const configField: ConfigFieldsForm[] = [{ key: 'quantity', label: 'Cantidad', type: 'text' }]
    const modalQuantity = this.modal.open(DinamicModal, {
      data: {
        title: 'Indica la cantidad de piezas',
        formGroup: formQuantity,
        configFields: configField,
        message: 'Estas seguro de que quieres eliminar el coche',
        typeModal: 'Confirmar',
      }
    })

    const confirm = await modalQuantity.closed.toPromise()
    if (confirm) {
      const formValue = formQuantity.value
      if (formValue.quantity && this.data.id) {
        const dataAdd: PartDataForService = {
          changeRecomended: true,
          partId: part.id,
          quantity: formValue.quantity
        }
        this.servicesPartService.addPartToService(this.data.id, dataAdd).subscribe({
          next: (resp) =>{
            this.toast.show('Pieza añadida', resp.message, 'success')
            this.getAllPartSevice()
            this.getAllParts()
          },
          error: (error) => {
            console.log(error);
            
          }
        })
      }
    }
  }


  remove(part:partTypeService){
    if(this.data.id){
      this.servicesPartService.removePartToSercice(this.data.id,part.partId).subscribe({
        next: (resp) =>{
          this.toast.show('Eliminado pieza', resp.message, 'success')
          this.getAllPartSevice()
          this.getAllParts()
        }
      })
    }
  }

  cancel() {
    this.dialogRef.close()
  }

}
