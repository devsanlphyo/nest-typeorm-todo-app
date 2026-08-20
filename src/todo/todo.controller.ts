import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/createTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';

@Controller('v1/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAll() {
    return this.todoService.getAll();
  }

  @Get(':id')
  getTodoDetail(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.getTodoDetail(id);
  }

  @Post()
  createTodo(@Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(dto);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.deleteTodo(id);
  }

  @Patch(':id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTodoDto,
  ) {
    return this.todoService.updateTodo(id, dto);
  }
}
