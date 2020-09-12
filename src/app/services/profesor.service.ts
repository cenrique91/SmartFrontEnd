import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  myAppUrl = 'https://localhost:44343/';
  myAPIUrl = 'api/Profesor/';

  constructor(private http: HttpClient) { }

  traerProfesores():Observable<any>{
    return this.http.get(this.myAppUrl + this.myAPIUrl)
  }
}
