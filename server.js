const app = require('./app.js');
const port = 8000;
const host = 'localhost';
const connectDatabase = require("./config/database.js");


const server = app.listen(port,()=>{
    console.log('server is loaded on Port : ',`http://${host}:${port}`);
})