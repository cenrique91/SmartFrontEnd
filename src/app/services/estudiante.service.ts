import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Estudiante } from '../models/Estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  myAppUrl = 'https://localhost:44343/';
  myAPIUrl = 'api/Estudiante/';
  list: Estudiante[];
  private actualizarFormulario = new BehaviorSubject<Estudiante>({} as any);

  constructor(private http: HttpClient) {}

  guardarEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.myAppUrl + this.myAPIUrl, estudiante);
  }

  obtenerEstudiantes() {
    this.http
      .get(this.myAppUrl + this.myAPIUrl)
      .toPromise()
      .then((r) => {
        this.list = r as Estudiante[];
      });
  }

  eliminarEstudiante(id: number): Observable<Estudiante> {
    return this.http.delete<Estudiante>(this.myAppUrl + this.myAPIUrl + id);
  }

  actualizar(estudiante) {
    this.actualizarFormulario.next(estudiante);
  }

  obtenerEstudiante$(): Observable<Estudiante> {
    return this.actualizarFormulario.asObservable();
  }

  actualizarEstudiante(id: number, estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(
      this.myAppUrl + this.myAPIUrl + id,
      estudiante
    );
  }

  traerEstudiantes(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myAPIUrl);
  }
}
