import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ITodosRepository } from './interfaces/todos.repository.interface';

@Injectable()
export class TodosRepository implements ITodosRepository {
  private todos: Todo[] = [];
  private idCounter = 1;

  findAll(): Todo[] {
    return this.todos;
  }

  findById(id: number): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  create(createTodoDto: CreateTodoDto): Todo {
    const newTodo: Todo = {
      id: this.idCounter++,
      title: createTodoDto.title,
      priority: createTodoDto.priority,
      createdAt: new Date()
    };

    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo | undefined {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return undefined;
    }

    const updatedTodo = {
      ...this.todos[todoIndex],
      ...updateTodoDto
    };

    this.todos[todoIndex] = updatedTodo;
    return updatedTodo;
  }

  remove(id: number): boolean {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
            
    if (todoIndex === -1) {
      return false;
    }

    this.todos.splice(todoIndex, 1);
    return true;
  }
}