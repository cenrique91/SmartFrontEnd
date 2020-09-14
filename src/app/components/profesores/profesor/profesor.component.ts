import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Profesor } from 'src/app/models/profesor';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css'],
})
export class ProfesorComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription;
  profesor: Profesor;
  idProfesor = 0;

  constructor(
    private formBuider: FormBuilder,
    private _profesorService: ProfesorService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuider.group({
      id: 0,
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
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
    this.idProfesor = 0;
    console.log(this.idProfesor);
    this.subscription = this._profesorService
      .obtenerProfesor$()
      .subscribe((r) => {
        // console.log(r);
        this.profesor = r;
        this.form.patchValue({
          nombres: this.profesor.nombres,
          apellidos: this.profesor.apellidos,
          dni: this.profesor.dni,
          fechaNacimiento: this.profesor.fechaNacimiento,
          direccion: this.profesor.direccion,
          telefono: this.profesor.telefono,
          correo: this.profesor.correo,
        });
        this.idProfesor = this.profesor.id;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  guardarProfesor() {
    console.log('ENTRO EN guardarProfesor()');
    console.log('IDPROFESOR ', this.idProfesor);
    if (this.idProfesor === 0) {
      console.log('NUEVO PROFESOR');
      this.agregar();
    } else {
      this.editar();
    }
  }

  agregar() {
    const profesor: Profesor = {
      nombres: this.form.get('nombres').value,
      apellidos: this.form.get('apellidos').value,
      dni: this.form.get('dni').value,
      fechaNacimiento: this.form.get('fechaNacimiento').value,
      direccion: this.form.get('direccion').value,
      telefono: this.form.get('telefono').value,
      correo: this.form.get('correo').value,
    };

    console.log('EL PROFESOR QUE VA AL SERVICE ', profesor);
    this._profesorService.guardarProfesor(profesor).subscribe(
      (r) => {
        this.toastr.success('Registro agregado', 'El profesor fue agregado.');
        this._profesorService.obtenerProfesores();
        this.form.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editar() {
    const profesor: Profesor = {
      id: this.profesor.id,
      nombres: this.form.get('nombres').value,
      apellidos: this.form.get('apellidos').value,
      dni: this.form.get('dni').value,
      fechaNacimiento: this.form.get('fechaNacimiento').value,
      direccion: this.form.get('direccion').value,
      telefono: this.form.get('telefono').value,
      correo: this.form.get('correo').value,
    };
    this._profesorService
      .actualizarProfesor(this.idProfesor, profesor)
      .subscribe((r) => {
        this.toastr.info(
          'Registro actualizado',
          'El profesor fue actualizado.'
        );
        this._profesorService.obtenerProfesores();
        this.form.reset();
        this.idProfesor = 0;
      });
  }
}
