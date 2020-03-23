export class Usuario {

    public  id: number;
    public  alias: string;
    public  password: string;
    public  fecha_creacion: string;
    public  estado: string;
    public  nombre: string;
    public  apellido: string;
    public  rol_id: number;

    public getNombre() {
      return this.nombre;
    }
}
