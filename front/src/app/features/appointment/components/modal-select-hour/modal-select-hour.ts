import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { DateReserved, MechanicSlot } from '../../../../core/interfaces/appointment.interface';
import { CommonModule } from '@angular/common';
import { Separator } from "../../../../shared/separator/separator";
import { AppointmentSocketService } from '../../../../core/service/appointmentSocket.service';
interface ReservedSlotData {
  day: string;
  mechanicId: number;
  hour: Date | string;
}
@Component({
  selector: 'app-modal-select-hour',
  imports: [CommonModule, Separator],
  templateUrl: './modal-select-hour.html',
  styleUrl: './modal-select-hour.css'
})
export class ModalSelectHour {
  constructor(
    @Inject(DIALOG_DATA) public data: { mechanicSlot: MechanicSlot[], date: string },
    private dialogRef: DialogRef<{ date: Date, mechanicId: number } | null>,
    private socket: AppointmentSocketService
  ) {
    // Mapear Data para incluir el campo reservedDateClient
    this.mappingDataSlots()
    this.socket.emit('joinDay', data.date)

    this.socket.on('slotReserved', (data: ReservedSlotData[]) => {
      this.selectHourOtherClient(data)
    })
  }

  selectHourOtherClient(data: ReservedSlotData[]) {
    this.data.mechanicSlot.forEach(mechanicSlot => {
        mechanicSlot.slot.forEach(slot => {
            slot.reservedDateClient = false
        })
    })
    for (const hourSelected of data) {
        const dateSelect = new Date(hourSelected.hour)
        const indexMechanic = this.data.mechanicSlot.findIndex(mechanicSlot => mechanicSlot.mechanic.id === hourSelected.mechanicId)
        if (indexMechanic === -1) {
            continue
        }

        const mechanicSlots = this.data.mechanicSlot[indexMechanic].slot;
        const indexDateSelected = mechanicSlots.findIndex(hour => 
            new Date(hour.date).getTime() === dateSelect.getTime()
        );
        
        if (indexDateSelected === -1) {
            continue
        }

        const date = mechanicSlots[indexDateSelected];
        date.reservedDateClient = true
    }
  }

  mappingDataSlots() {
    // Mapear Data para incluir el campo reservedDateClient
    this.data.mechanicSlot = this.data.mechanicSlot.map(mechanicData => {
      const processedSlots: DateReserved[] = (mechanicData.slot as unknown as string[]).map(dateString => ({
        date: new Date(dateString),
        reservedDateClient: false
      }))
      return {
        mechanic: mechanicData.mechanic,
        slot: processedSlots
      } as MechanicSlot;
    })
  }



  selectHour(hourSelected: Date, mechanicId: number) {
    const data: { date: Date, mechanicId: number } = {
      date: new Date(hourSelected),
      mechanicId: mechanicId
    }

    this.emitSelectedSlot(mechanicId, hourSelected)

    this.dialogRef.close(data)
  }

  emitSelectedSlot(mechanicId: number, hour: Date) {
    this.socket.emit('reservedSlot', { day: this.data.date, mechanicId: mechanicId, hour: hour })
  }


  closeModal() {
    this.dialogRef.close(null)
  }
}
