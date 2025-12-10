import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';
import { apiReponse } from '../interfaces/apiResponse.inteface';
import { EmployeeData, EmployeeWorkingHours, Employee } from '../interfaces/user.interfaces';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient)
  private url = environments.urlApi + 'employee/'

  getAllEmployee():Observable<apiReponse>{
    return this.http.get<apiReponse>(this.url)
  }

  postEmployee(employee:EmployeeData):Observable<apiReponse>{
    return this.http.post<apiReponse>(this.url, employee)
  }

  updateEmployee(id:number ,employee:Partial<Employee>):Observable<apiReponse>{
    return this.http.patch<apiReponse>(this.url + 'update-employee/' + id, employee)
  }

  deleteEmployee(id:number):Observable<apiReponse>{
    return this.http.delete<apiReponse>(this.url + id)
  }

  getEmployee(id:number):Observable<apiReponse>{
    return this.http.get<apiReponse>(this.url + id)
  }

  updateHourEmployee(id:number, hourData:Partial<EmployeeWorkingHours>):Observable<apiReponse>{
    return this.http.patch<apiReponse>(this.url + 'update-hour-employee/' + id, hourData)
  }
}
