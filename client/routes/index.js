const express = require('express');
const grpcController = require('../controllers/grpc');


const router = express.Router();


router.get('/todos', grpcController.listTodos);
router.post('/todos', grpcController.createTodo);
router.get('/todos/:id', grpcController.getSingleTodo);
router.delete('/todos/:id', grpcController.deleteTodo);
router.put('/todos/:id', grpcController.updateTodo);


module.exports = router;
