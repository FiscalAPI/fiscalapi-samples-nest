import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';

@Module({
  controllers: [TodosController],
  providers: [TodosService, TodosRepository],
})
export class TodosModule {}