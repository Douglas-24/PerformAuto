import { Component, inject, OnInit } from '@angular/core';
import { ToastServices } from '../../../../core/service/toast.service';
import { Dialog } from '@angular/cdk/dialog';
import { DinamicTable } from '../../../../shared/dinamic-table/dinamic-table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigFieldsForm, OptionSelect } from '../../../../core/interfaces/configFiledsForm';
import { Employee, EmployeeWorkingHours, RoleEmployee } from '../../../../core/interfaces/user.interfaces';
import { EmployeeService } from '../../../../core/service/employee.service';
import { DinamicModal } from '../../../../shared/dinamic-modal/dinamic-modal';
import { environments } from '../../../../core/environments/environments';
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

  allEmployee: Employee[] = []
  employeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    rol: new FormControl('', [Validators.required]),
  })

   roleOptions: OptionSelect[] = environments.rolesEmployee.map(rol => ({
      value: rol, 
      label: rol 
  }));
  configFields: ConfigFieldsForm[] = [
    { key: 'name', label: 'Nombre', type: 'text' },
    { key: 'lastname', label: 'Apellido', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'rol', label: 'Rol', type: 'select', options: this.roleOptions },
  ]

  ngOnInit(): void {
    this.getAllEmployee()
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe({
      next: (resp) => {
        this.allEmployee = resp.data
      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  async openModal(employee?: Employee, deleteAction?: boolean) {
    const title = !employee ? 'Crear nuevo empleado' : employee?.name + employee?.lastname
    const typeModal = employee ? 'Actualizar' : 'Crear'
    const modalRef = this.modal.open(DinamicModal, {
      data: {
        title: !deleteAction ? title : 'Eliminar empleado',
        formGroup: !deleteAction ? this.employeeForm : null,
        configFields: !deleteAction ? this.configFields : null,
        message: deleteAction ? 'Estas seguro de que quieres eliminar al empleado' : '',
        typeModal: deleteAction ? 'Confirmar' : typeModal,
        updateDataForm: employee
      }
    })
    const confimed = await modalRef.closed.toPromise()
      if (confimed) {
        if(deleteAction && employee){
          if(employee.id) this.deleteEmployee(employee.id)
        }else{
          employee ? this.updateEmployee(employee) : this.createEmployee()
        }
      } else {
        this.employeeForm.reset()
      }
  }

  createEmployee() {
    const formValue = this.employeeForm.value
    const employeeData: Employee = {
      name: formValue.name!,
      lastname: formValue.lastname!,
      email: formValue.email!,
      rol: formValue.rol as RoleEmployee
    }
    const EmployyeWorkingHour: EmployeeWorkingHours = {
      dayOfWeek: 5,
      startTime: '09:00',
      endTime: '18:00'
    }
    this.employeeService.postEmployee({ employee: employeeData, timeTableEmployee: EmployyeWorkingHour }).subscribe({
      next: (resp) => {
        this.getAllEmployee()
        this.toast.show('Empleado creado', resp.message, 'success')
      },
      error: (error) => {
        console.log(error);

      }
    })
  }
  updateEmployee(employe: Employee) {
    const formValue = this.employeeForm.value
    const employeeData: Employee = {
      name: formValue.name!,
      lastname: formValue.lastname!,
      email: formValue.email!,
      rol: formValue.rol as RoleEmployee
    }
    if (employe.id) {
      this.employeeService.updateEmployee(employe.id, employeeData).subscribe({
        next: (resp) => {
          this.getAllEmployee()
          this.toast.show('Empleado actualizado', resp.message, 'success')
        },
        error: (error) => {
          console.log(error);

        }
      })
    }
  }

  deleteEmployee(id:number){
    this.employeeService.deleteEmployee(id).subscribe({
      next: (resp) => {
        this.toast.show('Accion exitosa', resp.message, 'success')
        this.getAllEmployee()
      },
      error: (error) => {
        console.log(error);
      }
    })

  }


}
