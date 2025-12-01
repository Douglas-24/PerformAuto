import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ServicesOffered } from '../../../../core/service/services-offered.service';
import { ServicesOfferedInterface } from '../../../../core/interfaces/servicesOffered.interfaces';
import { Separator } from "../../../../shared/separator/separator";
import { PartServiceTypeService } from '../../../../core/service/part-service-type.service';
import { Car } from '../../../../core/interfaces/car.interface';
import { DataSelectService, DataPartChange, postDataPartsService } from '../../../../core/interfaces/partTypeService.interface';
import { Dialog } from '@angular/cdk/dialog';
import { ModalPartsService } from '../modal-parts-service/modal-parts-service';
@Component({
  selector: 'app-select-service',
  imports: [Separator],
  templateUrl: './select-service.html',
  styleUrl: './select-service.css'
})
export class SelectService implements OnInit {
  @Input() car: Car | null = null
  private service = inject(ServicesOffered)
  private typeServiceParts = inject(PartServiceTypeService)
  private modal = inject(Dialog)

  allServices: ServicesOfferedInterface[] = []

  servicesSelected: DataSelectService[] = []
  data: postDataPartsService | null = null

  @Input() servicesPartsSelected: DataSelectService[] = []
  @Output() userServicesSelected = new EventEmitter<DataSelectService[]>()
  @Output() back = new EventEmitter()
  ngOnInit(): void {
    if(this.servicesPartsSelected) this.servicesSelected = this.servicesPartsSelected
    if (this.car) {
      this.data = {
        userId: this.car.ownerId,
        carId: this.car.id,
        carCurrentMillage: this.car.current_mileage
      }
    };

    this.getAllServicesOffered()
  }

  getAllServicesOffered() {
    this.service.getAllServices().subscribe({
      next: (resp) => {
        this.allServices = resp.data
        if (this.servicesPartsSelected && this.servicesPartsSelected.length > 0) {;
            const selectedIds = this.servicesPartsSelected.map(s => s.service.id)
            this.allServices = this.allServices.filter(
              service => !selectedIds.includes(service.id)
            )
          }
      }
    })

  }

  getPartServiceSelect(service: ServicesOfferedInterface) {
    if (this.data) {
      this.typeServiceParts.getAllPartServices(service.id, this.data).subscribe({
        next: async (resp) => {
          const partChanges: DataPartChange[] = resp.data;

          const dialogRef = this.modal.open<DataSelectService | any>(ModalPartsService, {
            data: {
              parts: partChanges,
              service
            }
          });
          const selectService = await dialogRef.closed.toPromise()
          this.selectService(selectService)
        },
        error: (error) => {
          console.log(error);

        }
      })
    }
  }

  selectService(selectService: DataSelectService | null) {
    if (selectService) {
      const index = this.allServices.indexOf(selectService.service)
      this.allServices.splice(index, 1)
      this.servicesSelected.push(selectService)
    }

  }

  deselectService(service: DataSelectService) {
    const index = this.servicesSelected.indexOf(service)
    this.servicesSelected.splice(index, 1)
    this.allServices.push(service.service)

  }

  backSection(){
    this.back.emit()
  }

  nextSection() {
    this.userServicesSelected.emit(this.servicesSelected)
  }
}
