import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body() createTodoDTO: CreateTodoDto) {
    return this.todoService.createTodo(createTodoDTO)
  }

  @Get()
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }



  @Put(':todoId')
  async updateTodo(
    @Param('todoId') todoId: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.updateTodoById(todoId, updateTodoDto)
  }

  @Delete(':todoId')
  async deleteTodo(@Param('todoId') todoId: number) {
    return this.todoService.deleteByTodoId(todoId)
  }
}
