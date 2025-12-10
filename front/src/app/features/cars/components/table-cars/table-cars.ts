import { Component, inject, OnInit } from '@angular/core';
import { DinamicTable } from '../../../../shared/dinamic-table/dinamic-table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { ToastServices } from '../../../../core/service/toast.service';
import { DinamicModal } from '../../../../shared/dinamic-modal/dinamic-modal';
import { ConfigFieldsForm, OptionSelect } from '../../../../core/interfaces/configFiledsForm';
import { environments } from '../../../../core/environments/environments';
import { Car } from '../../../../core/interfaces/car.interface';
import { CarService } from '../../../../core/service/car.service';
import { UserService } from '../../../../core/service/user.service';
import { User } from '../../../../core/interfaces/user.interfaces';
@Component({
  selector: 'app-table-cars',
  imports: [DinamicTable],
  templateUrl: './table-cars.html',
  styleUrl: './table-cars.css'
})
export class TableCars implements OnInit {
  private carService = inject(CarService)
  private toast = inject(ToastServices)
  private modal = inject(Dialog)
  private userService = inject(UserService)
  allClient: User[] = []
  allCars: Car[] = []

  carForm = new FormGroup({
    photo: new FormControl(''),
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    enrolment: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    chassis_number: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    last_revision: new FormControl(''),
    current_mileage: new FormControl(0, [Validators.required, Validators.min(0)]),
    engine: new FormControl('', Validators.required),
    ownerId: new FormControl(null, [Validators.required, Validators.min(1)])
  })

  colunmTable:{ key: string; label: string }[] = [
    { key: 'brand', label: 'Marca'},
    { key: 'model', label: 'Modelo'},
    { key: 'enrolment', label: 'Matricula'},
    { key: 'chassis_number', label: 'Numero Bastidor'},
    { key: 'last_revision', label: 'Ultima revision'},
    { key: 'current_mileage', label: 'Km actuales'},
    { key: 'engine', label: 'Motor'},
    { key: 'owner', label: 'Dueño'},
  ]

  userOption: OptionSelect[] = []
  configField: ConfigFieldsForm[] = [
    { key: 'brand', label: 'Marca', type: 'text' },
    { key: 'model', label: 'Modelo', type: 'text' },
    { key: 'enrolment', label: 'Matricula', type: 'text' },
    { key: 'chassis_number', label: 'Numero Bastidor', type: 'text' },
    { key: 'last_revision', label: 'Ultima revision', type: 'text' },
    { key: 'current_mileage', label: 'Km actuales', type: 'text' },
    { key: 'engine', label: 'Motor', type: 'text' },
    { key: 'ownerId', label: 'Dueño', type: 'select', options: this.userOption },
  ]

  mappingCarForm(car?: Car): Car {
    const formValue = this.carForm.value

    const updateCar: Car = {
      ...(car?.id && { id: Number(car.id) }),
      photo: car?.photo || 'https://example.com/images/car6.jpg',
      brand: formValue.brand || '',
      model: formValue.model || '',
      enrolment: formValue.enrolment || '',
      chassis_number: formValue.chassis_number || '',
      last_revision: formValue.last_revision ? new Date(formValue.last_revision) : new Date(),
      current_mileage: formValue.current_mileage || 0,
      engine: formValue.engine || '',
      ownerId: parseInt(formValue.ownerId!)
    }
    return updateCar
  }

  ngOnInit() {
    this.getAllCars()
    this.getAllUser()
  }

  getAllUser() {
    this.userService.getAllClient().subscribe({
      next: (reps) => {
        this.allClient = reps.data
        this.userOption = this.allClient
          .filter(user => user.id !== undefined && user.id !== null)
          .map(user => ({
            label: user.name + ' ' + user.lastname,
            value: user.id ?? 0
          }));
          const ownerField = this.configField.find(field => field.key === 'ownerId');
            if (ownerField) {
                ownerField.options = this.userOption;
            }
      },
      error: (error) => {
        this.toast.show('Error al obtener los vehiculos', 'No se han podido obtener la lista de vehiculos', 'error')
      }

    })
  }

  getAllCars() {
    this.carService.getAllCars().subscribe({
      next: (reps) => {
        this.allCars = reps.data
      },
      error: (error) => {
        this.toast.show('Error al obtener los vehiculos', 'No se han podido obtener la lista de vehiculos', 'error')
      }
    })
  }

  async openModal(car?: Car, deleteAccion?: boolean) {
    const title = !car ? 'Crear nuevo coche' : car.brand + ' ' + car.model
    const typeModal = car ? 'Actualizar' : 'Crear'
    const modalRef = this.modal.open(DinamicModal, {
      data: {
        title: !deleteAccion ? title : 'Eliminar coche',
        formGroup: !deleteAccion ? this.carForm : null,
        configFields: !deleteAccion ? this.configField : null,
        message: deleteAccion ? 'Estas seguro de que quieres eliminar el coche' : '',
        typeModal: deleteAccion ? 'Confirmar' : typeModal,
        updateDataForm: car
      }
    })
    const confimed = await modalRef.closed.toPromise()
    if (confimed) {
      if (deleteAccion && car) {
        if (car.id) this.deleteCar(car.id)
      } else {
        car ? this.updateCar(car) : this.createCar()
      }
    } else {
      this.carForm.reset()
    }
  }

  updateCar(car: Car) {
    const updateCar = this.mappingCarForm(car)
    this.carService.updateCar(updateCar).subscribe({
      next: (resp) => {
        this.toast.show('Accion exitosa', resp.message, 'success')
        this.getAllCars()
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  createCar() {
    const newCar = this.mappingCarForm()
    this.carService.postCar(newCar).subscribe({
      next: (resp) => {
        this.toast.show('Accion exitosa', resp.message, 'success')
        this.getAllCars()
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  deleteCar(id: number) {
    this.carService.deleteCar(id).subscribe({
      next: (resp) => {
        this.toast.show('Accion exitosa', resp.message, 'success')
        this.getAllCars()
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}

