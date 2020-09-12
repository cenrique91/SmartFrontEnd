export class Estudiante {
  id?: number;
  nombre: string;
  dni: string;
  fechaNacimiento: Date;
  direccion: string;
  telefono: string;
  correo: string;
  profesorId: { id: number };
}
