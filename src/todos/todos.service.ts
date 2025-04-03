import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  create(createTodoDto: CreateTodoDto) {
    return this.todosRepository.create(createTodoDto);
  }

  findAll() {
    return this.todosRepository.findAll();
  }

  findOne(id: number) {
    const todo = this.todosRepository.findById(id);
    if (!todo) {
      throw new NotFoundException(`Todo con ID ${id} no encontrado`);
    }
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.todosRepository.update(id, updateTodoDto);
    if (!todo) {
      throw new NotFoundException(`Todo con ID ${id} no encontrado`);
    }
    return todo;
  }

  remove(id: number) {
    const exists = this.todosRepository.remove(id);
    if (!exists) {
      throw new NotFoundException(`Todo con ID ${id} no encontrado`);
    }
    return { success: true, message: 'Todo eliminado correctamente' };
  }
}