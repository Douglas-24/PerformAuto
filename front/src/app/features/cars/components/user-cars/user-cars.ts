import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../../../core/service/car.service';
import { AuthService } from '../../../../core/service/auth.service';
import { Car } from '../../../../core/interfaces/car.interface';
import { ToastServices } from '../../../../core/service/toast.service';
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
  allCarsUser:Car[] = []


  ngOnInit(): void {
    this.getIdUser()
  }

  getIdUser(){
    this.authService.getProfile().subscribe({
      next: (resp)=>{
        if(resp.user.id) this.getAllCars(resp.user.id)
      }
    })
  }

  getAllCars(id:number){
    this.carsService.getAllUserCars(id).subscribe({
      next:(resp) =>{
        this.allCarsUser = resp.data
        console.log(this.allCarsUser);
        
      },
      error:(error) =>{
        this.toastService.show('Error producido', error.message, 'error')
      }
    })  
  }
}
