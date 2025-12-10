import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-confirm-appointment',
  imports: [CommonModule, RouterLink],
  templateUrl: './confirm-appointment.html',
  styleUrl: './confirm-appointment.css'
})
export class ConfirmAppointment {
  @Input() dateAppointment:Date =  new Date()

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
} 
