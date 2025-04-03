import { ApiProperty } from '@nestjs/swagger';

export class Todo {
  @ApiProperty({ example: 1, description: 'Identificador único' })
  id: number;

  @ApiProperty({ example: 'Comprar leche', description: 'Descripción de la tarea' })
  title: string;

  @ApiProperty({ example: 5, description: 'Prioridad de la tarea' })
  priority: number;

  @ApiProperty({ example: '2025-04-03T12:00:00Z', description: 'Fecha de creación' })
  createdAt: Date;
}