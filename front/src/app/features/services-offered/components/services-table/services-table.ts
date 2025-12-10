import { Component, inject, OnInit } from '@angular/core';
import { DinamicTable } from '../../../../shared/dinamic-table/dinamic-table';
import { ServicesOffered } from '../../../../core/service/services-offered.service';
import { ToastServices } from '../../../../core/service/toast.service';
import { Dialog } from '@angular/cdk/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigFieldsForm } from '../../../../core/interfaces/configFiledsForm';
import { ServicesOfferedInterface } from '../../../../core/interfaces/servicesOffered.interfaces';
import { DinamicModal } from '../../../../shared/dinamic-modal/dinamic-modal';
import { ModalAgregatePartService } from '../modal-agregate-part-service/modal-agregate-part-service';
@Component({
  selector: 'app-services-table',
  imports: [DinamicTable],
  templateUrl: './services-table.html',
  styleUrl: './services-table.css'
})
export class ServicesTable implements OnInit {
  private services = inject(ServicesOffered)
  private toast = inject(ToastServices)
  private modal = inject(Dialog)

  allServices: ServicesOfferedInterface[] = []

  servicesForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    frequency_km: new FormControl('', [Validators.required]),
    frequency_time: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
  })

  configFields: ConfigFieldsForm[] = [
    { key: 'name', label: 'Nombre', type: 'text' },
    { key: 'description', label: 'Descripcion', type: 'text' },
    { key: 'price', label: 'Precio', type: 'text' },
    { key: 'frequency_km', label: 'Cada cuantos Km realizar', type: 'text' },
    { key: 'frequency_time', label: 'Cada cuanto tiempo relizar', type: 'text' },
    { key: 'duration', label: 'Duracion estimada', type: 'text' },
  ]

  ngOnInit(): void {
    this.getAllServicesOffered()
  }

  getAllServicesOffered(){
    this.services.getAllServices().subscribe({
      next:(resp) => {
        console.log(resp.data);
        
        this.allServices = resp.data
      },
      error:(error) => {
        console.log(error);
        
      }
    })
  }
  async openModal(service?:ServicesOfferedInterface, deleteAction?:boolean){
    const title = !service ? 'Crear nuevo coche' : service.name
        const typeModal = service ? 'Actualizar' : 'Crear'
        const modalRef = this.modal.open(DinamicModal, {
          data: {
            title: !deleteAction ?  title : 'Eliminar coche',
            formGroup: !deleteAction ?  this.servicesForm : null,
            configFields: !deleteAction ? this.configFields : null,
            message: deleteAction ? 'Estas seguro de que quieres eliminar el coche' :'',
            typeModal: deleteAction ? 'Confirmar' : typeModal,
            updateDataForm: service
          }
        })
    const confimed = await modalRef.closed.toPromise()
    if (confimed) {
      if(deleteAction && service){
        if(service.id) this.deleteService(service.id)
      }else{
        service ? this.updateService(service) : this.createService()
      }
    } else {
      this.servicesForm.reset()
    }
  }

  createService(){
    const formValue = this.servicesForm.value
    const serviceData: ServicesOfferedInterface = {
            name: formValue.name!,
            description: formValue.description!,
            price: parseFloat(formValue.price!),
            frequency_km: parseInt(formValue.frequency_km!, 10),
            frequency_time: formValue.frequency_time!,
            duration: parseInt(formValue.duration!, 10)
    }
    this.services.postService(serviceData).subscribe({
      next:(resp) =>{
        this.getAllServicesOffered()
        this.toast.show('Accion exitosa', resp.message, 'success')
      },
      error:(error) =>{
        console.log(error);
        
      }
    })
  }

  updateService(service:ServicesOfferedInterface){
    const formValue = this.servicesForm.value
    const serviceData: ServicesOfferedInterface = {
            name: formValue.name!,
            description: formValue.description!,
            price: parseFloat(formValue.price!),
            frequency_km: parseInt(formValue.frequency_km!, 10),
            frequency_time: formValue.frequency_time!,
            duration: parseInt(formValue.duration!, 10)
    }
    if(service.id){
      this.services.updateService(service.id,serviceData).subscribe({
        next:(resp)=>{
          this.getAllServicesOffered()
          this.toast.show('Accion exitosa', resp.message, 'success')
        },
        error: (error)=>{
          console.log(error);
        }
      })
    }
  }

  deleteService(id:number){
    this.services.deleteService(id).subscribe({
      next: (resp) => {
        this.toast.show('Accion exitosa', resp.message, 'success')
        this.getAllServicesOffered()
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openAggregatePartToService(service:ServicesOfferedInterface){
    this.modal.open(ModalAgregatePartService,{
      data: service
    })
  }

}
