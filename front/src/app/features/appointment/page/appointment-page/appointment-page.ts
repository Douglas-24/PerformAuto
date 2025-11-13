import { Component } from '@angular/core';
import { Footer } from '../../../../shared/footer/footer';
import { Header } from '../../../../shared/header/header';
import { CarSelect } from "../../components/car-select/car-select";
import { Car } from '../../../../core/interfaces/car.interface';
import { SelectService } from "../../components/select-service/select-service";
import { ServicesOfferedInterface } from '../../../../core/interfaces/servicesOffered.interfaces';
@Component({
  selector: 'app-appointment-page',
  imports: [Header, CarSelect, SelectService],
  templateUrl: './appointment-page.html',
  styleUrl: './appointment-page.css'
})
export class AppointmentPage {

  nextSecction:number = 1
  carSelected:Car | null = null
  servicedSelected:ServicesOfferedInterface[] = []

  getUserCarSelected(car:Car){
    this.carSelected = car
    this.nextSecction++
  }

  getAllUserServiceSelected(servicesSelected:ServicesOfferedInterface[]){
    this.servicedSelected = servicesSelected
    this.nextSecction++
  }
}
