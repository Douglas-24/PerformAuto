import { Component, inject, OnInit } from '@angular/core';
import { ToastServices } from '../../../../core/service/toast.service';
import { Dialog } from '@angular/cdk/dialog';
import { DinamicTable } from '../../../../shared/dinamic-table/dinamic-table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigFieldsForm } from '../../../../core/interfaces/configFiledsForm';
import { Employee, RoleEmployee } from '../../../../core/interfaces/user.interfaces';
import { EmployeeService } from '../../../../core/service/employee.service';
@Component({
  selector: 'app-employee-table',
  imports: [DinamicTable],
  templateUrl: './employee-table.html',
  styleUrl: './employee-table.css'
})
export class EmployeeTable implements OnInit {
  private employeeService = inject(EmployeeService)
  private toast = inject(ToastServices)
  private modal = inject(Dialog)

  allEmployee:Employee[] = []
  employeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    rol: new FormControl('', [Validators.required]),
  })

  configFields: ConfigFieldsForm[] = [
    {key: 'name', label: 'Nombre', type: 'text'},
    {key: 'lastname', label: 'Apellido', type: 'text'},
    {key: 'email', label: 'Email', type: 'text'},
    {key: 'rol', label: 'Rol', type: 'text'},
  ]

  ngOnInit(): void {
    this.getAllEmployee()
  }

  getAllEmployee(){
    this.employeeService.getAllEmployee().subscribe({
      next:(resp)=>{
        this.allEmployee = resp.data
        console.log(resp);
      },
      error: (error) =>{
        console.log(error);
        
      }
    })
  }
}
