import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoEntity } from './entity/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';



interface Todo extends Omit<TodoEntity, 'category'> {}

const todoDtoStub = (update?: Partial<CreateTodoDto>): CreateTodoDto => {
  const body = {
    key: "ZDJLC0Zq",
    description: "Implement Unit Testing",
    categoryId: 1    
  }
  return Object.assign({}, body, update);
}

const todoStub = (update?: Partial<Todo>): Todo => {
  const body = {
    id: 1,
    key: "ZDJLC0Zq",
    description: "Implement Unit Testing",
    categoryId: 1,
    createdAt: "2022-07-20T18:18:21.000Z",
    updtedAt: "2022-07-20T18:18:21.000Z"
  }
  return Object.assign({}, body, update)
}


const mockTodoService = jest.fn().mockReturnValue({
  createTodo: jest.fn().mockResolvedValue(todoStub()),
  getAllTodos: jest.fn().mockResolvedValue([todoStub()]),
  updateTodoById: jest.fn().mockResolvedValue(true),
  deleteByTodoId: jest.fn().mockResolvedValue(true)  
})

describe('TodoController Suite', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService()
        }
      ]
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
    jest.clearAllMocks()
  });


  test('Module Setup & Providers Injected', () => {
    expect(todoController).toBeDefined();
    expect(todoService).toBeDefined();
    expect(todoService).toHaveProperty('createTodo');
  });

  test('Create New Todo', async () => {
    const todo = await todoController.createTodo(todoDtoStub())

    expect(todo.id).toBeDefined()
    expect(todo.description).toEqual(todoStub().description)
    expect(todoService.createTodo).toHaveBeenCalledTimes(1)
    expect(todoService.createTodo).toHaveBeenCalledWith(todoDtoStub())
  })  

  test('Get All Todos', async () => {
    const todos = await todoController.getAllTodos()

    expect(Array.isArray(todos)).toBeTruthy()
    expect(todos[0]).toBeDefined()
    expect(todoService.getAllTodos).toHaveBeenCalledTimes(1)
  });


  test('Update Existing Todo', async () => {
    const todoId = todoStub().id;
    const update = { description: "Changed Description" };
    const updatedBody = todoDtoStub(update);

    const result = await todoController.updateTodo(todoId, updatedBody);
    expect(result).toBeTruthy()
    expect(todoService.updateTodoById).toHaveBeenCalledTimes(1)
    expect(todoService.updateTodoById).toHaveBeenCalledWith(todoId, updatedBody)
  })  


  test('Delete Todo', async () => {
    const todoId = todoStub().id;

    const result = await todoController.deleteTodo(todoId);
    expect(result).toBeTruthy()
    expect(todoService.deleteByTodoId).toHaveBeenCalledTimes(1)
    expect(todoService.deleteByTodoId).toHaveBeenCalledWith(todoId)
  })  
});

