import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profesor } from '../models/profesor';

@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  myAppUrl = 'https://localhost:44343/';
  myAPIUrl = 'api/Profesor/';
  list: Profesor[];
  private actualizarFormulario = new BehaviorSubject<Profesor>({} as any);

  constructor(private http: HttpClient) {}

  guardarProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.myAppUrl + this.myAPIUrl, profesor);
  }

  obtenerProfesores() {
    this.http
      .get(this.myAppUrl + this.myAPIUrl)
      .toPromise()
      .then((r) => {
        this.list = r as Profesor[];
      });
  }

  eliminarProfesor(id: number): Observable<Profesor> {
    return this.http.delete<Profesor>(this.myAppUrl + this.myAPIUrl + id);
  }

  actualizar(profesor) {
    this.actualizarFormulario.next(profesor);
  }

  obtenerProfesor$(): Observable<Profesor> {
    return this.actualizarFormulario.asObservable();
  }

  actualizarProfesor(id: number, profesor: Profesor): Observable<Profesor> {
    return this.http.put<Profesor>(
      this.myAppUrl + this.myAPIUrl + id,
      profesor
    );
  }

  traerProfesores(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myAPIUrl);
  }
}
