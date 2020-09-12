import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription;
  curso: Curso;
  idCurso = 0;
  profesores: [];

  constructor(
    private formBuider: FormBuilder,
    private _cursoService: CursoService,
    private _profesorService: ProfesorService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuider.group({
      id: 0,
      nombre: ['', [Validators.required]],
      profesorId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.subscription = this._cursoService.obtenerCurso$().subscribe((r) => {
      this.curso = r;
      this.form.patchValue({
        nombre: this.curso.nombre,
        profesorId: this.curso.profesorId,
      });
      this.idCurso = this.curso.id;
    });
    this.traerProfesores();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  guardarCurso() {
    if (this.idCurso === 0) {
      this.agregar();
    } else {
      this.editar();
    }
  }

  agregar() {
    const curso: Curso = {
      nombre: this.form.get('nombre').value,
      profesorId: this.form.get('profesorId').value,
    };

    this._cursoService.guardarCurso(curso).subscribe(
      (r) => {
        this.toastr.success('Registro agregado', 'El curso fue agregado.');
        this._cursoService.obtenerCursos();
        this.form.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editar() {
    const curso: Curso = {
      id: this.curso.id,
      nombre: this.form.get('nombre').value,
      profesorId: this.form.get('profesorId').value,
    };
    this._cursoService.actualizarCurso(this.idCurso, curso).subscribe((r) => {
      this.toastr.info('Registro actualizado', 'El curso fue actualizado.');
      this._cursoService.obtenerCursos();
      this.form.reset();
      this.idCurso = 0;
    });
  }

  traerProfesores() {
    this._profesorService.traerProfesores().subscribe((r) => {
      console.log(r);
      this.profesores = r;
    });
  }
}
