const mongoose = require('mongoose')
const schema = mongoose.Schema;

var photoSchema=new schema({
    name:String,
    path: String,
    size:Number,
    date: {type: Date, default: Date()},
    desc:String
})

let photo = mongoose.model('Photo', photoSchema)

module.exports = photo