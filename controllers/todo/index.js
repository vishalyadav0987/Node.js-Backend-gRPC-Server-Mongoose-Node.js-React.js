const getTodos = require('./get.todos');
const createTodo = require('./create.todo');
const getSingleTodo = require('./get.todo');
const deleteTodo = require('./delete.todo');
const updateTodo = require('./update.todo');

module.exports = {
    getTodos,
    createTodo,
    getSingleTodo,
    deleteTodo,
    updateTodo
};
