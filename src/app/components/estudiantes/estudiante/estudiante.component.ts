import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css'],
})
export class EstudianteComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription;
  estudiante: Estudiante;
  idEstudiante = 0;

  constructor(
    private formBuider: FormBuilder,
    private _estudianteService: EstudianteService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuider.group({
      id: 0,
      nombre: ['', [Validators.required]],
      dni: [
        '',
        [Validators.required, Validators.maxLength(8), Validators.minLength(8)],
      ],
      fechaNacimiento: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(6),
        ],
      ],
      correo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.subscription = this._estudianteService
      .obtenerEstudiante$()
      .subscribe((r) => {
        // console.log(r);
        this.estudiante = r;
        this.form.patchValue({
          nombre: this.estudiante.nombre,
          dni: this.estudiante.dni,
          fechaNacimiento: this.estudiante.fechaNacimiento,
          direccion: this.estudiante.direccion,
          telefono: this.estudiante.telefono,
          correo: this.estudiante.correo,
        });
        this.idEstudiante = this.estudiante.id;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  guardarEstudiante() {
    if (this.idEstudiante === 0) {
      this.agregar();
    } else {
      this.editar();
    }
  }

  agregar() {
    const estudiante: Estudiante = {
      nombre: this.form.get('nombre').value,
      dni: this.form.get('dni').value,
      fechaNacimiento: this.form.get('fechaNacimiento').value,
      direccion: this.form.get('direccion').value,
      telefono: this.form.get('telefono').value,
      correo: this.form.get('correo').value,
    };

    this._estudianteService.guardarEstudiante(estudiante).subscribe(
      (r) => {
        this.toastr.success('Registro agregado', 'El estudiante fue agregado.');
        this._estudianteService.obtenerEstudiantes();
        this.form.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editar() {
    const estudiante: Estudiante = {
      id: this.estudiante.id,
      nombre: this.form.get('nombre').value,
      dni: this.form.get('dni').value,
      fechaNacimiento: this.form.get('fechaNacimiento').value,
      direccion: this.form.get('direccion').value,
      telefono: this.form.get('telefono').value,
      correo: this.form.get('correo').value,
    };
    this._estudianteService
      .actualizarEstudiante(this.idEstudiante, estudiante)
      .subscribe((r) => {
        this.toastr.info(
          'Registro actualizado',
          'El estudiante fue actualizado.'
        );
        this._estudianteService.obtenerEstudiantes();
        this.form.reset();
        this.idEstudiante = 0;
      });
  }
}
