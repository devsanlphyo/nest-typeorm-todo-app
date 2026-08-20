import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/createTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';

type Todo = {
  id: number;
  title: string;
};

let TodosList: Todo[] = [
  {
    id: 1,
    title: 'Hello world',
  },
  {
    id: 2,
    title: 'I am good',
  },
  {
    id: 3,
    title: 'Yay, I am working',
  },
];

@Injectable()
export class TodoService {
  getAll() {
    return {
      IsSuccess: true,
      Message: 'Fetching all todos success',
      TodosList,
    };
  }

  getTodoDetail(id: number) {
    console.log('getTodoDetail: ', id);
    if (!id) {
      return {
        IsSuccess: false,
        Message: 'id is required',
      };
    }

    const existingTodo = TodosList.find((t) => t.id === id);
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

  createTodo(dto: CreateTodoDto) {
    if (!dto.title) {
      return {
        IsSuccess: false,
        Message: 'title is required',
      };
    }

    const newTodo: Todo = {
      id: TodosList.length + 1,
      title: dto.title,
    };

    TodosList.push(newTodo);

    return {
      IsSuccess: true,
      Message: 'Creating new todo success',
    };
  }

  deleteTodo(id: number) {
    if (!id) {
      return {
        IsSuccess: false,
        Message: 'id is required',
      };
    }

    const existingTodo = TodosList.find((t) => t.id === id);
    if (!existingTodo) {
      return {
        IsSuccess: false,
        Message: 'No todo with that id exist',
      };
    }

    TodosList = TodosList.filter((t) => t.id !== id);

    return {
      IsSuccess: true,
      Message: 'Deleting todo success',
    };
  }

  updateTodo(id: number, dto: UpdateTodoDto) {
    if (!id) {
      return {
        IsSuccess: false,
        Message: 'id is required',
      };
    }

    const existingTodo = TodosList.find((t) => t.id === id);
    if (!existingTodo) {
      return {
        IsSuccess: false,
        Message: 'No todo with that id exist',
      };
    }

    if (dto.title) {
      existingTodo.title = dto.title;

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
