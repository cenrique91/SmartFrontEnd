import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  myAppUrl = 'https://localhost:44343/';
  myAPIUrl = 'api/Curso/';
  list: Curso[];
  private actualizarFormulario = new BehaviorSubject<Curso>({} as any);

  constructor(private http: HttpClient) {}

  guardarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.myAppUrl + this.myAPIUrl, curso);
  }

  obtenerCursos() {
    this.http
      .get(this.myAppUrl + this.myAPIUrl)
      .toPromise()
      .then((r) => {
        this.list = r as Curso[];
      });
  }

  eliminarCurso(id: number): Observable<Curso> {
    return this.http.delete<Curso>(this.myAppUrl + this.myAPIUrl + id);
  }

  actualizar(curso) {
    this.actualizarFormulario.next(curso);
  }

  obtenerCurso$(): Observable<Curso> {
    return this.actualizarFormulario.asObservable();
  }

  actualizarCurso(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(this.myAppUrl + this.myAPIUrl + id, curso);
  }
}
