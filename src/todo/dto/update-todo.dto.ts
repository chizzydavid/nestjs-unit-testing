import { IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  description?: string;

  @IsNumber()
  @IsPositive()
  categoryId?: number;
}
