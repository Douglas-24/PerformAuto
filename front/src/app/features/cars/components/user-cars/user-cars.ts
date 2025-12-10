import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../../../core/service/car.service';
import { AuthService } from '../../../../core/service/auth.service';
import { Car } from '../../../../core/interfaces/car.interface';
import { ToastServices } from '../../../../core/service/toast.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalCar } from '../modal-car/modal-car';
import { Employee, User } from '../../../../core/interfaces/user.interfaces';
@Component({
  selector: 'app-user-cars',
  imports: [CommonModule],
  templateUrl: './user-cars.html',
  styleUrl: './user-cars.css'
})
export class UserCars implements OnInit {
  private carsService = inject(CarService)
  private authService = inject(AuthService)
  private toastService = inject(ToastServices)
  private modal = inject(Dialog)
  allCarsUser:Car[] = []
  user:User| Employee | null = null

  ngOnInit(): void {
    this.getIdUser()
  }

  getIdUser(){
    this.authService.getProfile().subscribe({
      next: (resp)=>{
        if(resp.user.id){
          this.getAllCars(resp.user.id)
          this.user = resp.user
        } 
      }
    })
  }

  getAllCars(id:number){
    this.carsService.getAllUserCars(id).subscribe({
      next:(resp) =>{
        this.allCarsUser = resp.data
      },
      error:(error) =>{
        this.toastService.show('Error producido', error.message, 'error')
      }
    })  
  }

  async openModal(car?:Car){
    const dialog = this.modal.open(ModalCar, {
      data: {car:car, user:this.user}
    })
    
    const confirmed = await dialog.closed.toPromise()
    if(confirmed && this.user?.id){
      this.getAllCars(this.user.id)
    }
  }
}
