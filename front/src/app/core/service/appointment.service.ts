import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { apiReponse } from '../interfaces/apiResponse.inteface';
import { Observable } from 'rxjs';
import { DataCreateAppointment } from '../interfaces/appointment.interface';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
    private http = inject(HttpClient)
    private url = environments.urlApi + 'appoiment/'


    createAppointment(appointment:DataCreateAppointment):Observable<apiReponse>{
      return this.http.post<apiReponse>(this.url, appointment)
    }

    getDatesAvailable(durationStimated: {duration:number}):Observable<apiReponse>{
      return this.http.post<apiReponse>(this.url + 'dates-available', durationStimated)
    }

    getAllAppointmentUser(id_user:number):Observable<apiReponse>{
      return this.http.get<apiReponse>(this.url + 'appoiment-client/' + id_user)
    }
    getAllAppointmentMechanic(id_mechanic:number):Observable<apiReponse>{
      return this.http.get<apiReponse>(this.url + 'appoiment-mechanic/' + id_mechanic)
    }

    getServicesPartsAppointment(id_appoiment:number):Observable<apiReponse>{
      return this.http.get<apiReponse>(this.url + 'services-appointment/' + id_appoiment)
    }
}
