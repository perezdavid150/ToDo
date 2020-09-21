import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private url = 'https://todo-77454.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearTarea( tarea ){

    return this.http.post(`${ this.url }/tareas.json`, tarea);

  }

}
