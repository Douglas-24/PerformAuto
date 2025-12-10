import { Component, inject, OnInit } from '@angular/core';
import { ToastServices } from '../../../../core/service/toast.service';
import { Dialog } from '@angular/cdk/dialog';
import { DinamicTable } from '../../../../shared/dinamic-table/dinamic-table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigFieldsForm } from '../../../../core/interfaces/configFiledsForm';
import { PartsService } from '../../../../core/service/parts.service';
import { Parts, PartUsed } from '../../../../core/interfaces/parts.interfaces';
import { DinamicModal } from '../../../../shared/dinamic-modal/dinamic-modal';
@Component({
  selector: 'app-parts-table',
  imports: [DinamicTable],
  templateUrl: './parts-table.html',
  styleUrl: './parts-table.css'
})
export class PartsTable implements OnInit {
  private partsService = inject(PartsService)
  private toast = inject(ToastServices)
  private modal = inject(Dialog)

  allParts: PartUsed[] = []
  partsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    reference: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
  })

  configFields: ConfigFieldsForm[] = [
    { key: 'name', label: 'Nombre', type: 'text' },
    { key: 'reference', label: 'Nº referencia', type: 'text' },
    { key: 'price', label: 'Precio', type: 'text' },
    { key: 'stock', label: 'Stock', type: 'text' },
  ]

  ngOnInit(): void {
    this.getAllParts()
  }

  async openModal(part?: PartUsed, deleteAction?: boolean) {
    const title = !part ? 'Crear nueva pieza' : part.name
    const typeModal = part ? 'Actualizar' : 'Crear'
    const modalRef = this.modal.open(DinamicModal, {
      data: {
        title: !deleteAction ? title : 'Eliminar pieza',
        formGroup: !deleteAction ? this.partsForm : null,
        configFields: !deleteAction ? this.configFields : null,
        message: deleteAction ? 'Estas seguro de que quieres eliminar la pieza' : '',
        typeModal: deleteAction ? 'Confirmar' : typeModal,
        updateDataForm: part
      }
    })
    const confimed = await modalRef.closed.toPromise()
    if (confimed) {
      if(deleteAction && part){
        if(part.id) this.deletePart(part.id)
      }else{
        part ? this.updatePart(part) : this.createPart()
      }
    } else {
      this.partsForm.reset()
    }
  }

  getAllParts() {
    this.partsService.getAllParts().subscribe({
      next: (resp) => {
        this.allParts = resp.data
        console.log(resp);

      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  createPart() {
    const formValue = this.partsForm.value
    const partData: Parts = {
      name: formValue.name!,
      reference: formValue.reference!,
      price: parseInt(formValue.price!),
      stock: parseInt(formValue.stock!)
    }
    this.partsService.postPart(partData).subscribe({
      next: (resp) => {
        this.getAllParts()
        this.toast.show('Pieza creada', resp.message, 'success')
      },
      error: (error) => {
        console.log(error);

      }
    })
  }
  updatePart(part: PartUsed) {
    const formValue = this.partsForm.value
    const partData: Parts = {
      name: formValue.name!,
      reference: formValue.reference!,
      price: parseInt(formValue.price!),
      stock: parseInt(formValue.stock!)
    }
    this.partsService.updatePart(part.id, partData).subscribe({
      next: (resp) => {
        this.getAllParts()
        this.toast.show('Pieza actualizada', resp.message, 'success')
      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  deletePart(id:number){
    this.partsService.deletePart(id).subscribe({
      next: (resp) => {
        this.toast.show('Accion exitosa', resp.message, 'success')
        this.getAllParts()
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

}

