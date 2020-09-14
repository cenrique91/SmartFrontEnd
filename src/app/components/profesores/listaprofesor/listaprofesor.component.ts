import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-listaprofesor',
  templateUrl: './listaprofesor.component.html',
  styleUrls: ['./listaprofesor.component.css'],
})
export class ListaprofesorComponent implements OnInit {
  constructor(
    public _profesorService: ProfesorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._profesorService.obtenerProfesores();
  } 

  eliminarProfesor(id: number) {
    if (confirm('Está seguro que desea eliminar el registro?')) {
      this._profesorService.eliminarProfesor(id).subscribe((r) => {
        this._profesorService.obtenerProfesores();
        this.toastr.warning('Registro eliminado', 'El profesor fue eliminado.');
      });
    }
  }

  editarProfesor(profesor) {
    this._profesorService.actualizar(profesor);
  }
}
