import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../../../core/service/car.service';
import { AuthService } from '../../../../core/service/auth.service';
import { ToastServices } from '../../../../core/service/toast.service';
import { Car, CarUser } from '../../../../core/interfaces/car.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Role, RoleEmployee, User } from '../../../../core/interfaces/user.interfaces';
import { UserService } from '../../../../core/service/user.service';
@Component({
  selector: 'app-car-select',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './car-select.html',
  styleUrl: './car-select.css'
})
export class CarSelect {
  private carsService = inject(CarService)
  private authService = inject(AuthService)
  private userService = inject(UserService)
  private toastService = inject(ToastServices)

  array = Array.from({ length: 10 })
  allCarsUser: CarUser[] = []
  showSelected: Car | null = null
  showCars: boolean = false
  allClient: User[] = []

  filteredClients: User[] = []
  searchTerm: string = ''

  clientSelected: User | null = null
  @Output() userCarSelected = new EventEmitter<Car>()
  ngOnInit(): void {
    this.getIdUser()
  }
  getIdUser() {
    this.authService.getProfile().subscribe({
      next: (resp) => {
        if (resp.user.rol == Role.CLIENT && resp.user.id) {
          this.getAllCars(resp.user.id)
        }
        if (resp.user.rol == RoleEmployee.CUSTOMER_SERVICE) {
          this.showCars = false
          this.getAllClient()
        }
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

  getAllClient() {
    this.userService.getAllClient().subscribe({
      next: (resp) => {
        this.allClient = resp.data
      },
      error: (error) => {
        console.log(error);

      }
    })
  }



  filterClients(): void {
    const term = this.searchTerm.toLowerCase();
    if (!term) {
      this.filteredClients = []
      return
    }
    this.filteredClients = this.allClient.filter(client => {
      const searchIn = `${client.dni} ${client.email}`.toLowerCase()
      return searchIn.includes(term)
    });
  }

  selectClient(client: User) {
    if (client && client.id) {
      this.clientSelected = client
      this.getAllCars(client.id)
      this.showCars = true
    }
  }

  changeClient() {
    this.clientSelected = null
    this.showCars = false
    this.searchTerm = ''
    this.filteredClients = []
  }

  viewCarSelected(car: Car) {
    this.showSelected = car
  }

  nextSection() {
    if (this.showSelected) this.userCarSelected.emit(this.showSelected)
  }


}
