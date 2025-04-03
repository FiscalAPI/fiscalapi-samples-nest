import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ example: 'Comprar leche', description: 'Descripción de la tarea' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 5, description: 'Prioridad de la tarea (1-10)' })
  @IsNumber()
  @Min(1)
  priority: number;
}