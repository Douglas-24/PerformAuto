import { Component, inject, OnInit } from '@angular/core';
import { ToastServices } from '../../../../core/service/toast.service';
import { Dialog } from '@angular/cdk/dialog';
import { DinamicTable } from '../../../../shared/dinamic-table/dinamic-table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigFieldsForm } from '../../../../core/interfaces/configFiledsForm';
import { PartsService } from '../../../../core/service/parts.service';
import { Parts } from '../../../../core/interfaces/parts.interfaces';
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

  allParts:Parts[] = []
  partsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    references: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
  })

  configFields: ConfigFieldsForm[] = [
    {key: 'name', label: 'Nombre', type: 'text'},
    {key: 'reference', label: 'Nº referencia', type: 'text'},
    {key: 'price', label: 'Precio', type: 'text'},
    {key: 'stock', label: 'Stock', type: 'text'},
  ]

  ngOnInit(): void {
    this.getAllParts()
  }

  getAllParts(){
    this.partsService.getAllParts().subscribe({
      next:(resp)=>{
        this.allParts = resp.data
        console.log(resp);
        
      },
      error: (error) =>{
        console.log(error);
        
      }
    })
  }

}

