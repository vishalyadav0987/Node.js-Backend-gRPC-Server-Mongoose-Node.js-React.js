const db = require('../../db');

// -- call is the incoming request object, typically passed by gRPC when calling a 
//    service method. It   contains information about the request made.

// -- callback is the function you call to send a response back to the client (gRPC client).

const getTodos = async (call, callback) => {
    try {
        const result = await db.getAllTodos(); // Wait for the result
        console.log(result);
        
        callback(null, { todos: result || [] }); // If result is falsy, return an empty array
    } catch (e) {
        callback(e); // If an error occurs, send it back to the client
    }
};

module.exports = getTodos;
