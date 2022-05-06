const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/employee');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error connected to MongoDB'));

db.once('open',()=>{
    console.log('successfully connected to the database');
})

module.exports = db;