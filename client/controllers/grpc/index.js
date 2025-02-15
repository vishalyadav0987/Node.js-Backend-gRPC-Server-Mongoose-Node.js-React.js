const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');


const packageDefinition = protoLoader.loadSync(`${__dirname}../../../../proto/todo.proto`, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

// console.log(packageDefinition); // here present all controller function and that is define in proto file.


const todoPackageDefinition = grpc.loadPackageDefinition(packageDefinition).todo;

const client = new todoPackageDefinition.TodoService(
    'localhost:50051',
    grpc.credentials.createInsecure(),
);

// console.log(todoPackageDefinition.TodoService.service);
// console.log(client.getTodos);


// {}: An empty object is passed as the request, which indicates no parameters are being sent for this call.


// Definition: This line calls the getTodos method from the client object (probably the gRPC client in this case).
const listTodos = async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            client.getTodos({}, (error, response) => {
                if (error) reject(error);
                else resolve(response);
            });
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getSingleTodo = (req, res) => {
    const { id } = req.params;
    client.getSingleTodo({ id }, (error, result) => {
        if (!error) {
            res.status(200).json(result);
        } else {
            res.status(400).json(error);
        }
    });
};


const deleteTodo = (req, res) => {
    const { id } = req.params;
    client.deleteTodo({ id }, (error, result) => {
        if (!error) {
            res.status(200).json(result);
        } else {
            res.status(400).json(error);
        }
    });
};


const updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todo = {
        id,
        title,
        completed
    };
    client.updateTodo(todo, (error, result) => {
        if (!error) {
            res.status(200).json(result);
        } else {
            res.status(400).json(error);
        }
    });
};


const createTodo = (req, res) => {
    const { body } = req;
    console.log(body);
    
    let id = Math.floor(Math.random() * 1000000) + 1;
    id = id.toString();
    const newTodo = {
        id,
        title: body.title,
        completed: false
    };
    client.createTodo(newTodo, (error, todo) => {
        if (!error) {
            res.status(201).json(todo);
        } else {
            res.status(400).json(error);
        }
    });
};


module.exports = {
    listTodos,
    createTodo,
    getSingleTodo,
    deleteTodo,
    updateTodo
};
