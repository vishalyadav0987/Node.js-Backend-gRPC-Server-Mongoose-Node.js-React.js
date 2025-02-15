const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
require('./lib/mongo');

const packageDefinition = protoLoader.loadSync('./proto/todo.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const todoPackageDefinition = grpc.loadPackageDefinition(packageDefinition).todo;

const Controller = require('./controllers');


const server = new grpc.Server();
server.addService(todoPackageDefinition.TodoService.service, {
    getTodos: Controller.Todo.getTodos,
    createTodo: Controller.Todo.createTodo,
    getSingleTodo: Controller.Todo.getSingleTodo,
    deleteTodo: Controller.Todo.deleteTodo,
    updateTodo: Controller.Todo.updateTodo
});

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://127.0.0.1:50051');
server.start();
