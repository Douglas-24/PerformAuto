import { Component, inject, OnInit } from '@angular/core';
import { DinamicTable } from '../../../../shared/dinamic-table/dinamic-table';
import { ServicesOffered } from '../../../../core/service/services-offered.service';
import { ToastServices } from '../../../../core/service/toast.service';
import { Dialog } from '@angular/cdk/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigFieldsForm } from '../../../../core/interfaces/configFiledsForm';

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

  allServices: ServicesOffered[] = []

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
        console.log(resp);
        
        this.allServices = resp.data
      },
      error:(error) => {
        console.log(error);
        
      }
    })
  }
}
