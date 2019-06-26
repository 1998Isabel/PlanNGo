const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const userSchema = new Schema({
    usertoken: String,
    projectName : String,
    firstDay: String,
    totalDays: [String],
    items: [{
        id: String,
        place: {
            description: String,
            placeid: String,
            name: String,
            type: String,
            duration: Number,
            photo: String,
            price: Number,
            location: [Number]
        }
    }],
    days: [{
        id: String, 
        itemsid: [String]
    }] 
})
// Creating a table within database with the defined schema
const user = mongoose.model('user', userSchema)

// Exporting table for querying and mutating
module.exports = user