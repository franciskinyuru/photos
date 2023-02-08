const mongoose = require('mongoose')
mongoose.set("strictQuery", false);

// Connecting to the Database
let mongodb_url = process.env.MONGO_URI;
let dbName = 'photos';
mongoose.connect(mongodb_url)
let db = mongoose.connection;

// Check Connection
db.once('open', ()=>{
   console.log('Database connected successfully')
})

// Check for DB Errors
db.on('error', (error)=>{
   console.log(error);
})

module.exports = db