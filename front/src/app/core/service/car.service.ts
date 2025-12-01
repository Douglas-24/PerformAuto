import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';
import { apiReponse } from '../interfaces/apiResponse.inteface';
import { Car } from '../interfaces/car.interface';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private http = inject(HttpClient)
  private url = environments.urlApi + 'cars/'
  
  getAllCars():Observable<apiReponse>{
    return this.http.get<apiReponse>(this.url)
  }

  getCar(id:number):Observable<apiReponse>{
    return this.http.get<apiReponse>(this.url + id)
  }

  postCar(car:Car):Observable<apiReponse>{
    return this.http.post<apiReponse>(this.url, car)
  }

  updateCar(car:Car):Observable<apiReponse>{
    return this.http.put<apiReponse>(this.url + car.id, car)
  }

  deleteCar(id:number):Observable<apiReponse>{
    return this.http.delete<apiReponse>(this.url + id)
  }
  
  getAllUserCars(id:number):Observable<apiReponse>{
    return this.http.get<apiReponse>(this.url + "carsUser/" + id)
  }
}
