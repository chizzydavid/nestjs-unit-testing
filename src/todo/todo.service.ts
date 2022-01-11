import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entity/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto) {
    const created = await this.todoRepository.save(createTodoDto);
    return created as TodoEntity;
  }

  async getAllTodos() {
    const found = await this.todoRepository.find({});
    return found;
  }


  async getTodoByKey(key: string) {
    const found = await this.todoRepository.findOne({
      where: {
        key,
      },
    });

    return found;
  }

  async getTodoById(id: number) {
    const found = await this.todoRepository.findOne({
      where: {
        id,
      },
    });

    return found;
  }

  async updateTodoById(id: number, updateTodoDto: UpdateTodoDto) {
    await this.todoRepository.update(
      {
        id,
      },
      updateTodoDto,
    );

    return true;
  }

  async deleteByTodoId(todoId: number) {
    await this.todoRepository.delete({
      id: todoId,
    });

    return true;
  }    
}
