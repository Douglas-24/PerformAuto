import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { apiReponse } from '../interfaces/apiResponse.inteface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwsS3Service {
  private http = inject(HttpClient)
  private url = environments.urlApi + 'aws-s3/'

  uploadFile(file:File):Observable<apiReponse>{
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post<apiReponse>(this.url + 'upload-file', formData)
  }
  uploadFiles(files:File[]):Observable<apiReponse>{
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    
    return this.http.post<apiReponse>(this.url + 'upload-files', formData)
  }
}
