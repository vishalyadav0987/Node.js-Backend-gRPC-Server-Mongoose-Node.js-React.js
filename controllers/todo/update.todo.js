const db = require('../../db');


function updateTodo(call, callback) {
    const todo = call.request;
    const { id } = todo;
    db.updateTodo(id, todo)
        .then(() => {
            callback(null, {
                status: true
            });
        })
        .catch((e) => {
            callback(e);
        });
}


module.exports = updateTodo;
