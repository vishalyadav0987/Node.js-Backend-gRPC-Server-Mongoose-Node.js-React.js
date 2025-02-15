const db = require('../../db');


function getSingleTodo(call, callback) {
    const { id } = call.request;
    db.getTodo(id)
        .then((result) => {
            if (!result) {
                callback('Could not find any todo with that id');
            }
            callback(null, result);
        })
        .catch((e) => {
            callback(e);
        });
}


module.exports = getSingleTodo;
