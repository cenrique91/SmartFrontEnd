import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { CursoComponent } from './components/cursos/curso/curso.component';
import { ListacursoComponent } from './components/cursos/listacurso/listacurso.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { ListaprofesorComponent } from './components/profesores/listaprofesor/listaprofesor.component';
import { ProfesorComponent } from './components/profesores/profesor/profesor.component';
import { EstudianteComponent } from './components/estudiantes/estudiante/estudiante.component';
import { ListaestudianteComponent } from './components/estudiantes/listaestudiante/listaestudiante.component';
import { HomeComponent } from './components/home/home.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    CursosComponent,
    CursoComponent,
    ListacursoComponent,
    ProfesoresComponent,
    ListaprofesorComponent,
    ProfesorComponent,
    EstudianteComponent,
    ListaestudianteComponent,
    HomeComponent,
    EstudiantesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
