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

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Identificador único' })
  @IsNotEmpty()
  @IsString()
  guid: string;
}