import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-listaestudiante',
  templateUrl: './listaestudiante.component.html',
  styleUrls: ['./listaestudiante.component.css']
})
export class ListaestudianteComponent implements OnInit {
  constructor(
    public _estudianteService: EstudianteService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._estudianteService.obtenerEstudiantes();
  } 

  eliminarEstudiante(id: number) {
    if (confirm('Está seguro que desea eliminar el registro?')) {
      this._estudianteService.eliminarEstudiante(id).subscribe((r) => {
        this._estudianteService.obtenerEstudiantes();
        this.toastr.warning('Registro eliminado', 'El estudiante fue eliminado.');
      });
    }
  }

  editarEstudiante(estudiante) {
    this._estudianteService.actualizar(estudiante);
  }
}
