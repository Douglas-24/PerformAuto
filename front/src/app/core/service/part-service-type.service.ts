import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';
import { apiReponse } from '../interfaces/apiResponse.inteface';
import { partTypeService,postDataPartsService } from '../interfaces/partTypeService.interface';
@Injectable({
  providedIn: 'root'
})
export class PartServiceTypeService {
    private http = inject(HttpClient)
    private url = environments.urlApi + 'parts-service/'

    addPartTypeService(partTypeService: partTypeService):Observable<apiReponse>{
      return this.http.post<apiReponse>(this.url, partTypeService)
    }

    getAllPartTypeService(idTypeService:  number):Observable<apiReponse>{
      return this.http.get<apiReponse>(this.url + 'getAllPartService/' + idTypeService)
    }
    
    getAllServicesWithParts():Observable<apiReponse>{
      return this.http.get<apiReponse>(this.url + 'allPartsAndServices')
    }

    updatePartTypeService(idTypeService:number, updatePartTypeService:partTypeService):Observable<apiReponse>{
      return this.http.patch<apiReponse>(this.url + idTypeService, updatePartTypeService)
    }

    removePartTypeService(idTypeService:number):Observable<apiReponse>{
      return this.http.delete<apiReponse>(this.url + idTypeService)
    }

    getAllPartServices(id_service:number, data:postDataPartsService):Observable<apiReponse>{
      return this.http.post<apiReponse>(this.url + 'parts-need-remplaced/' + id_service,data)
    }

}
