import { Component } from '@angular/core';
import { Footer } from '../../../../shared/footer/footer';
import { Header } from '../../../../shared/header/header';
import { CarSelect } from "../../components/car-select/car-select";
import { Car } from '../../../../core/interfaces/car.interface';
import { SelectService } from "../../components/select-service/select-service";
import { DataSelectService } from '../../../../core/interfaces/partTypeService.interface';
import { InitialBudget } from "../../components/initial-budget/initial-budget";
import { SelectDate } from "../../components/select-date/select-date";
import { ConfirmAppointment } from "../../components/confirm-appointment/confirm-appointment";
@Component({
  selector: 'app-appointment-page',
  imports: [Header, CarSelect, SelectService, InitialBudget, SelectDate, ConfirmAppointment],
  templateUrl: './appointment-page.html',
  styleUrl: './appointment-page.css'
})
export class AppointmentPage {

  nextSecction:number = 1
  carSelected:Car | null = null
  servicedSelected:DataSelectService[] = []
  dateAppointment: Date = new Date()
  
  getUserCarSelected(car:Car){
    this.carSelected = car
    this.nextSectionAction()
  }

  getAllUserServiceSelected(servicesSelected:DataSelectService[]){
    this.servicedSelected = servicesSelected
    this.nextSectionAction()
  }

  nextSectionAction(dateAppointment?:Date){
    if(dateAppointment) this.dateAppointment = dateAppointment
    this.nextSecction++
  }  


  backSection(servicesPartsSelected?:DataSelectService[]){
    if(servicesPartsSelected) this.servicedSelected = servicesPartsSelected
    this.nextSecction--
  }
}
