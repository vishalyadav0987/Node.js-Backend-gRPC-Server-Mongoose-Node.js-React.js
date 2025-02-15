const Todo = require('../models/todo');

const saveTodo = async (data) => {
    try {
        const todo = new Todo(data);
        return await todo.save();
    } catch (e) {
        throw e;
    }
};

const getAllTodos = async () => {
    try {
        return await Todo.find().sort({ id: 'asc' }).exec();
    } catch (e) {
        throw e;
    }
};

const getTodo = async (key = '') => {
    try {
        return await Todo.findOne({ id: key }).exec();
    } catch (e) {
        throw e;
    }
};

const deleteTodo = async (key = '') => {
    try {
        return await Todo.findOneAndDelete({ id: key }).exec();
    } catch (e) {
        throw e;
    }
};

const updateTodo = async (key = '', arg) => {
    try {
        return await Todo.findOneAndUpdate({ id: key }, arg, { new: true }).exec();
    } catch (e) {
        throw e;
    }
};

module.exports = {
    saveTodo,
    getAllTodos,
    getTodo,
    deleteTodo,
    updateTodo
};
