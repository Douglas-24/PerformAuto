import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { apiReponse } from '../interfaces/apiResponse.inteface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private http = inject(HttpClient)
  private url = environments.urlApi + 'notification/'

  allNotificationEmployee(id_employe: number):Observable<apiReponse>{
    return this.http.get<apiReponse>(this.url + 'notification-employee/' + id_employe)
  }
  
  allNotificationUser(id_user:number):Observable<apiReponse>{
    return this.http.get<apiReponse>(this.url + 'notification-user/' + id_user)
    
  }
  
  deleteNotification(id:number):Observable<apiReponse>{
    return this.http.delete<apiReponse>(this.url + id)
  }

  markRead(id:number):Observable<apiReponse>{
    return this.http.get<apiReponse>(this.url + 'mark-read/' + id)
  }
}
