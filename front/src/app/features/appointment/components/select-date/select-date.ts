import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSelectService } from '../../../../core/interfaces/partTypeService.interface';
import { AppointmentService } from '../../../../core/service/appointment.service';
import { Appointment, AvailableDay, MechanicSlot } from '../../../../core/interfaces/appointment.interface';
import { Dialog } from '@angular/cdk/dialog';
import { ModalSelectHour } from '../modal-select-hour/modal-select-hour';
import { User } from '../../../../core/interfaces/user.interfaces';
import { Car } from '../../../../core/interfaces/car.interface';
import { StateServie } from '../../../../core/interfaces/appointment.interface';
@Component({
  selector: 'app-select-date',
  imports: [CommonModule],
  templateUrl: './select-date.html',
  styleUrl: './select-date.css'
})
export class SelectDate implements OnInit {
  @Input() servicesPartsSelected: DataSelectService[] = []
  @Input() car: Car | null = null
  @Output() back = new EventEmitter()
  private appointmentService = inject(AppointmentService)
  private modal = inject(Dialog)
  duration: number = 0
  availablesDates: AvailableDay[] = []
  dateAppointmentSelected: { date: Date, mechanicId: number } | null = null

  ngOnInit() {
    for (const service of this.servicesPartsSelected) {
      this.duration += service.service.duration
    }
    this.getAllDateAvailable()
  }


  getAllDateAvailable() {
    this.appointmentService.getDatesAvailable({ duration: this.duration }).subscribe({
      next: (resp) => {
        this.availablesDates = resp.data

      },
      error: (error) =>
        console.log(error)

    })
  }

  async openModalSelectHour(hours: MechanicSlot[], date: string) {
    const dialog = this.modal.open<{ date: Date, mechanicId: number } | any>(ModalSelectHour, {
      data: {
        mechanicSlot: hours,
        date: date
      }
    })
    const dialogClose = await dialog.closed.toPromise()
    if (dialogClose) {
      this.dateAppointmentSelected = dialogClose
      console.log(dialogClose);

    }
  }

  formatDate(date: Date): string {
    const d = new Date(date)
    let day = d.toLocaleDateString("es-ES", { weekday: "long" })
    day = day.charAt(0).toUpperCase() + day.slice(1)
    const legibleDate = d.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });

    return `${day}, ${legibleDate}`;
  }

  createAppoinmtent() {
    if (this.car && this.car.id && this.dateAppointmentSelected) {
      const appintmentCreate: Appointment = {
        state: StateServie.PENDING,
        clientId: this.car?.ownerId,
        carId: this.car.id,
        mechanicId: this.dateAppointmentSelected?.mechanicId,
        appoiment_date: this.dateAppointmentSelected.date,
        mileage_at_delivery: this.car.current_mileage,
        duration: this.duration
      }
      console.log(appintmentCreate);
      

      this.appointmentService.createAppointment({appoinment:appintmentCreate,servicesSelected: this.servicesPartsSelected}).subscribe({
        next:(resp) =>{
          console.log(resp);
        },
        error: (error) => {
          console.log(error);
        }
      })

    }
  }

  backSection() {
    this.back.emit()
  }
}
