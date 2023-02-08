require('dotenv').config()
const express = require('express')
const app = express()
const connection = require('./db/db')
const route = require('./routes/photos')
const path= require('path')
require('./models/photos')
app.use(express.json())
app.use( express.static("public" ) );
app.set('view engine', 'ejs')
app.use(route)
const port = process.env.PORT || 8000
const start = async ()=>{
    await connection
    app.listen(port, ()=>{
        console.log(`Server running on port: ${port} ... `);
    })
}
start()