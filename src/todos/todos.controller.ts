import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiResponse({ status: 201, description: 'Tarea creada correctamente', type: Todo })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  @ApiResponse({ status: 200, description: 'Lista de tareas', type: [Todo] })
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarea', type: 'number' })
  @ApiResponse({ status: 200, description: 'Tarea encontrada', type: Todo })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tarea' })
  @ApiParam({ name: 'id', description: 'ID de la tarea', type: 'number' })
  @ApiResponse({ status: 200, description: 'Tarea actualizada correctamente', type: Todo })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea' })
  @ApiParam({ name: 'id', description: 'ID de la tarea', type: 'number' })
  @ApiResponse({ status: 200, description: 'Tarea eliminada correctamente' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.remove(id);
  }
}