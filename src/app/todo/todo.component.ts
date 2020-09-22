import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {NgForm} from '@angular/forms' ;
import { TareasService } from '../services/tareas.service';

export interface Todo {
  title: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})


export class TodoComponent {

  title = 'To-Do';
  taskName  = String;
  todoList = String;
  arr = [];

  constructor(
    private tareasService: TareasService
  ) { }

  public todo: Todo[] = [
    { title: 'Watch Bohemian Rhapsody'},
    { title: 'Read Medium Article'},
    { title: 'Swimming'}
  ];

  public done: Todo[] = [
    { title: 'Write a blog'},
    { title: 'Study Angular'},
    { title: 'Check e-mail'},
    { title: 'Walk dog'}
  ];


  // tslint:disable-next-line: typedef
  async onSubmit(f: NgForm ){
    this.arr = f.value;
    // tslint:disable-next-line: no-string-literal
    const todo = { titulo: this.arr['taskName'], estado: 0 };

    this.todo.push({ title: todo.titulo});

    await this.tareasService.crearTarea( todo ).subscribe(
      resp => {
        console.log(resp);
      }
    );

  }

  // tslint:disable-next-line: typedef
  drop(event: CdkDragDrop<Todo[]>) {
    console.log(event.container.data);

    if (event.previousContainer === event.container) {
      // change the items index if it was moved within the same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex

      );
    } else {
      // remove item from the previous list and add it to the new array
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

}
