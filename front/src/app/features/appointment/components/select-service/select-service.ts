import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ServicesOffered } from '../../../../core/service/services-offered.service';
import { ServicesOfferedInterface } from '../../../../core/interfaces/servicesOffered.interfaces';
import { Separator } from "../../../../shared/separator/separator";

@Component({
  selector: 'app-select-service',
  imports: [Separator],
  templateUrl: './select-service.html',
  styleUrl: './select-service.css'
})
export class SelectService implements OnInit {
  private service = inject(ServicesOffered)  
  allServices:ServicesOfferedInterface[] = []

  servicesSelected:ServicesOfferedInterface[] = []
  @Output() userServicesSelected = new EventEmitter<ServicesOfferedInterface[]>()

  ngOnInit(): void {
    this.getAllServicesOffered()
  }

  getAllServicesOffered(){
    this.service.getAllServices().subscribe({
      next: (resp) => {
        this.allServices = resp.data
      }
    })
  }

  selectService(service:ServicesOfferedInterface){
    const index = this.allServices.indexOf(service)
    this.allServices.splice(index, 1)    
    this.servicesSelected.push(service)
  }
  
  deselectService(service:ServicesOfferedInterface){
    const index = this.servicesSelected.indexOf(service)
    this.servicesSelected.splice(index,1)
    this.allServices.push(service)
    
  }

  nextSection(){
    this.userServicesSelected.emit(this.servicesSelected)
  }
}
