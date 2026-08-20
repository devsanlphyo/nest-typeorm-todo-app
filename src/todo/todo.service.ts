import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/createTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async getAll() {
    const todosList = await this.todoRepository.find();

    return {
      IsSuccess: true,
      Message: 'Fetching all todos success',
      todosList,
    };
  }

  async getTodoDetail(id: number) {
    const existingTodo = await this.todoRepository.findOneBy({ id });
    if (!existingTodo) {
      return {
        IsSuccess: false,
        Message: 'No todo with that id exist',
      };
    }

    return {
      IsSuccess: true,
      Message: 'Fetching todo successs',
      Todo: existingTodo,
    };
  }

  async createTodo(dto: CreateTodoDto) {
    await this.todoRepository.save({ title: dto.title });

    return {
      IsSuccess: true,
      Message: 'Creating new todo success',
    };
  }

  async deleteTodo(id: number) {
    const existingTodo = await this.todoRepository.findOneBy({ id });
    if (!existingTodo) {
      return {
        IsSuccess: false,
        Message: 'No todo with that id exist',
      };
    }

    await this.todoRepository.remove(existingTodo);

    return {
      IsSuccess: true,
      Message: 'Deleting todo success',
    };
  }

  async updateTodo(id: number, dto: UpdateTodoDto) {
    const existingTodo = await this.todoRepository.findOneBy({ id });
    if (!existingTodo) {
      return {
        IsSuccess: false,
        Message: 'No todo with that id exist',
      };
    }

    if (dto.title) {
      existingTodo.title = dto.title;
      await this.todoRepository.save(existingTodo);

      return {
        IsSuccess: true,
        Message: 'Updating todo success',
      };
    }

    return {
      IsSuccess: true,
      Message: 'No changes are updated',
    };
  }
}
