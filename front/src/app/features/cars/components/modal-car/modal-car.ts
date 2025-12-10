import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Car } from '../../../../core/interfaces/car.interface';
import { ToastServices } from '../../../../core/service/toast.service';
import { CarService } from '../../../../core/service/car.service';
import { ConfigFieldsForm } from '../../../../core/interfaces/configFiledsForm';
import { DinamicForm } from "../../../../shared/dinamic-form/dinamic-form";
import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { AwsS3Service } from '../../../../core/service/aws-s3.service';
import { User } from '../../../../core/interfaces/user.interfaces';

@Component({
  selector: 'app-modal-car',
  imports: [ReactiveFormsModule, DinamicForm],
  templateUrl: './modal-car.html',
  styleUrl: './modal-car.css'
})
export class ModalCar {
  private carService = inject(CarService)
  private toast = inject(ToastServices)
  private s3 = inject(AwsS3Service)
  private modal = inject(DialogRef)
  constructor(
    @Inject(DIALOG_DATA) public data: {car?:Car, user?:User},
  ) {
    console.log(data);
    
    if (data.car) {
      this.carForm.patchValue(data.car)
      if (data.car.photo) this.previewUrl = data.car.photo
    }
  }

  previewUrl: string | null = null;
  selectedFile?: File;
  allCars: Car[] = []
  showInputImg: boolean = false

  carForm = new FormGroup({
    brand: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    model: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    enrolment: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(15)] }),
    chassis_number: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(30)] }),
    current_mileage: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    engine: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });


  configField: ConfigFieldsForm[] = [
    { key: 'brand', label: 'Marca', type: 'text' },
    { key: 'model', label: 'Modelo', type: 'text' },
    { key: 'enrolment', label: 'Matricula', type: 'text' },
    { key: 'chassis_number', label: 'Numero Bastidor', type: 'text' },
    { key: 'current_mileage', label: 'Km actuales', type: 'text' },
    { key: 'engine', label: 'Motor', type: 'text' },
  ]


  cancel() {
    this.modal.close()
  }

  adjuntImg() {
    this.showInputImg = !this.showInputImg
    if (this.showInputImg) this.previewUrl = null
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    this.selectedFile = file;
    this.showInputImg = false
    const reader = new FileReader();
    reader.onload = () => (this.previewUrl = reader.result as string);
    reader.readAsDataURL(file);
  }

  isPhotoValid(): boolean {
    if (this.data.car && this.data.car.photo) {
        return true
    }
    return !!this.selectedFile || !!this.previewUrl;
}
  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      console.error('Solo se permiten imágenes');
      this.toast.show('Error al subir imagen', 'El archivo tiene que ser una imagen', 'error')
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    this.selectedFile = file;

    this.showInputImg = false
    const reader = new FileReader();
    reader.onload = () => (this.previewUrl = reader.result as string);
    reader.readAsDataURL(file);
  }

  confirm() {
    if (this.data.car) {
      this.updateCar()
    } else {
      this.createCar()
    }
  }

  createCar() {
    const formmValue = this.carForm.getRawValue();
    if(this.data.user && this.data.user.id){
      const newCar: Car = {
        ...formmValue,
        ownerId: this.data.user.id,
        current_mileage: Number(formmValue.current_mileage)
      };
      if(this.selectedFile){
        this.s3.uploadFile(this.selectedFile).subscribe({
        next: (resp) => {
          newCar.photo = resp.data.url;

          this.carService.postCar(newCar).subscribe({
            next: () => this.modal.close(true),
            error: (error) => console.error(error),
          });
        },
        error: (err) => console.error('Error al subir imagen:', err),
      });
      }else {
        this.carService.postCar(newCar).subscribe({
          next: (resp) => {
            console.log('Coche creado:', resp);
            this.modal.close(true);
          },
          error: (err) => {
            console.error('Error al crear coche:', err);
          }
        });
      }
    }
  }

  updateCar() {
    const formmValue = this.carForm.value

    const carToUpdate: Partial<Car> = {
      id: this.data.car?.id,
      ...formmValue,
    };
    if (this.previewUrl && this.previewUrl !== this.data.car?.photo && this.selectedFile) {
      this.s3.uploadFile(this.selectedFile).subscribe({
        next: (resp) => {
          carToUpdate.photo = resp.data.url;

          this.carService.updateCar(carToUpdate).subscribe({
            next: () => this.modal.close(true),
            error: (error) => console.error(error),
          });
        },
        error: (err) => console.error('Error al subir imagen:', err),
      });
    } else {
      this.carService.updateCar(carToUpdate).subscribe({
        next: () => this.modal.close(true),
        error: (error) => console.error(error),
      });
    }
  }

}
