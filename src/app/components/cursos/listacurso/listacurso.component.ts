import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-listacurso',
  templateUrl: './listacurso.component.html',
  styleUrls: ['./listacurso.component.css'],
})
export class ListacursoComponent implements OnInit {
  constructor(
    public _cursoService: CursoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._cursoService.obtenerCursos();
  }

  eliminarCurso(id: number) {
    if (confirm('Está seguro que desea eliminar el registro?')) {
      this._cursoService.eliminarCurso(id).subscribe((r) => {
        this._cursoService.obtenerCursos();
        this.toastr.warning('Registro eliminado', 'El curso fue eliminado');
      });
    }
  }

  editarCurso(curso) {
    this._cursoService.actualizar(curso);
  }
}
