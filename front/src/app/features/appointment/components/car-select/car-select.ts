import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../../../core/service/car.service';
import { AuthService } from '../../../../core/service/auth.service';
import { ToastServices } from '../../../../core/service/toast.service';
import { Car } from '../../../../core/interfaces/car.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Separator } from "../../../../shared/separator/separator";
@Component({
  selector: 'app-car-select',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './car-select.html',
  styleUrl: './car-select.css'
})
export class CarSelect {
  private carsService = inject(CarService)
  private authService = inject(AuthService)
  private toastService = inject(ToastServices)

  array = Array.from({length: 10})
  allCarsUser: Car[] = []
  showSelected: Car | null = null
  @Output() userCarSelected = new EventEmitter<Car>()
  ngOnInit(): void {
    this.getIdUser()
  }

  getIdUser() {
    this.authService.getProfile().subscribe({
      next: (resp) => {
        if (resp.user.id) this.getAllCars(resp.user.id)
      }
    })
  }

  getAllCars(id: number) {
    this.carsService.getAllUserCars(id).subscribe({
      next: (resp) => {
        this.allCarsUser = resp.data
      },
      error: (error) => {
        this.toastService.show('Error producido', error.message, 'error')
      }
    })
  }

  getCar(id:number){
    this.carsService.getCar(id).subscribe({
      next: (resp)=>{
        this.userCarSelected = resp.data
      }
    })
  }

  viewCarSelected(car:Car){
    this.showSelected = car
  }


  nextSection(){
    if(this.showSelected) this.userCarSelected.emit(this.showSelected)
  }


}
