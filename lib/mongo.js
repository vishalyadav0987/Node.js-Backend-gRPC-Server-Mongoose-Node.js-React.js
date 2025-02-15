const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,  // Added this line to resolve the deprecation warning
    useFindAndModify: false
});

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
    console.log(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

