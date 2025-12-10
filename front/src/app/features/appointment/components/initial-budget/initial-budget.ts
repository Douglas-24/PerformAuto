import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSelectService } from '../../../../core/interfaces/partTypeService.interface';
import { Car } from '../../../../core/interfaces/car.interface';

@Component({
  selector: 'app-initial-budget',
  imports: [],
  templateUrl: './initial-budget.html',
  styleUrl: './initial-budget.css'
})
export class InitialBudget implements OnInit {
  estimatedPrice: number = 0
  @Input() car: Car | null = null
  @Input() servicesPartsSelected: DataSelectService[] = []
  @Output() back = new EventEmitter<DataSelectService[]>()
  @Output() next = new EventEmitter()
  ngOnInit() {
    if (this.servicesPartsSelected) this.estimatedPrice = this.calculateEstimatePrice()
  }

  infoPart = {
    SHOULD_CHANGE: {
      nameSpain: "Cambiar",
      showPrice: "",
      class: "text-red-600",
      message: ""
    },
    REVIEW: {
      nameSpain: "Revisar",
      showPrice: "line-through decoration-[3px]",
      class: "text-cyan-600",
      message: "No se incluye en el presupuesto, el mecanico determinara si se cambia o no"
    },
    NO_CHANGE: {
      nameSpain: "No cambiar",
      showPrice: "line-through decoration-[3px]",
      class: "text-green-600",
      message: "No se cambia la pieza, por lo tanto no se incluye en el presupuesto"
    },
    CHANGED: {
      nameSpain: "Cambiado",
      showPrice: "line-through decoration-[3px]",
      class: "text-cyan-600",
      message: "No se incluye en el presupuesto, el mecanico determinara si se cambia o no"
    },
    REVISED: {
      nameSpain: "Revisado",
      showPrice: "line-through decoration-[3px]",
      class: "text-green-600",
      message: "No se cambia la pieza, por lo tanto no se incluye en el presupuesto"
    },
    CHANGE_URGENT: {
      nameSpain: "Cambio urgente",
      showPrice: "line-through decoration-[3px]",
      class: "text-red-600",
      message: "Reemplazo inmediato de la pieza"
    }
  }


  priceSercive(service: DataSelectService): number {
    let price = service.service.price
    for (let index = 0; index < service.parts.length; index++) {
      if (service.parts[index].acctionPart == "SHOULD_CHANGE") {
        price += service.parts[index].price
      }
    }
    return price
  }

  calculateEstimatePrice(): number {
    let price = 0
    for (let index = 0; index < this.servicesPartsSelected.length; index++) {
      price += this.priceSercive(this.servicesPartsSelected[index])
    }
    return price
  }


  backSection() {
    this.back.emit(this.servicesPartsSelected)
  }

  nextSection() {
    this.next.emit()
  }
}
