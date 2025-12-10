import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';
import { apiReponse } from '../interfaces/apiResponse.inteface';
import { ServicesOfferedInterface } from '../interfaces/servicesOffered.interfaces';
import { PartDataForService } from '../interfaces/partTypeService.interface';
@Injectable({
  providedIn: 'root'
})
export class ServicesOffered {
  private http = inject(HttpClient)  
  private url = environments.urlApi + 'service-workshop/'

  getAllServices():Observable<apiReponse>{
    return this.http.get<apiReponse>(this.url)
  }

  postService(service: ServicesOfferedInterface):Observable<apiReponse>{
    return this.http.post<apiReponse>(this.url,service)
  }
  updateService(id:number,service: Partial<ServicesOfferedInterface>):Observable<apiReponse>{
    return this.http.patch<apiReponse>(this.url + id,service)
  }
  deleteService(id:number):Observable<apiReponse>{
    return this.http.delete<apiReponse>(this.url + id)
  }

  addPartToService(id_service:number, parts:PartDataForService):Observable<apiReponse>{
    return this.http.post<apiReponse>(this.url + 'add-part-service/' + id_service,parts)
  }
  removePartToSercice(id_service:number, id_part:number):Observable<apiReponse>{
    return this.http.delete<apiReponse>(this.url + 'remove-part-service/' + id_service + '/' +id_part)
  }
}
