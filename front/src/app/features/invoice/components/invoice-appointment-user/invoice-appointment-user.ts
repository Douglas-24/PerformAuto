import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../../../core/service/invoice.service';
import { InvoiceResponse } from '../../../../core/interfaces/invoice.interfaces';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-invoice-appointment-user',
  imports: [CommonModule],
  templateUrl: './invoice-appointment-user.html',
  styleUrl: './invoice-appointment-user.css'
})
export class InvoiceAppointmentUser {
  private route = inject(ActivatedRoute)
  private invoiceService = inject(InvoiceService)
  id_appointment: string | null= ''
  invoice:InvoiceResponse | null = null
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id_appointment = params.get('id');
    });

    this.getInvoice()
  }


  getInvoice(){
    if(this.id_appointment){
      this.invoiceService.getInvoice(+this.id_appointment).subscribe({
        next: (resp) =>{
          console.log(resp.data);
          
          this.invoice = resp.data
        },
        error: (error) =>{
          console.log(error);
          
        }
      })
    }
  }
}
