import { Todo } from '../entities/todo.entity';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

export interface ITodosRepository {
  findAll(): Todo[];
  findById(id: number): Todo | undefined;
  create(createTodoDto: CreateTodoDto): Todo;
  update(id: number, updateTodoDto: UpdateTodoDto): Todo | undefined;
  remove(id: number): boolean;
}