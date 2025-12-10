import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { InvoiceResponse } from '../interfaces/invoice.interfaces';
import { Observable } from 'rxjs';
import { apiReponse } from '../interfaces/apiResponse.inteface';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private http = inject(HttpClient)
  private url = environments.urlApi + 'invoices/'

  createInvoice(invoice: InvoiceResponse):Observable<apiReponse>{
    return this.http.post<apiReponse>(this.url, invoice)
  }

  getAllInvoice(id_user:number):Observable<apiReponse>{
    return this.http.get<apiReponse>(this.url + 'all-invoice-user/' + id_user)
  }
  
  getInvoice(id:number):Observable<apiReponse>{
    return this.http.get<apiReponse>(this.url + id)
  }
}
