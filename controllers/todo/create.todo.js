const db = require('../../db');


function createTodo(call, callback) {
    const todo = call.request;
    db.saveTodo(todo)
        .then(() => {
            callback(null, todo);
        })
        .catch((e) => {
            callback(e);
        });
}


module.exports = createTodo;
