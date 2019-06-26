const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const User = require('./')

const placeSchema = new Schema({

    description: String,
    placeid: String,
    name: String,
    type: String,
    duration: Number,
    photo: String,
    price: Number,
    location: [Number]
    
})


// Creating a schema, sort of like working with an ORM
const userSchema = new Schema({
    usertoken: String,
    projectName : String,
    firstDay: String,
    totalDays: [String],
    items: [{
        id:String,
        place: placeSchema
    }],
    days: [{
        id: String, 
        itemsid: [String]
    }] 
})

// Creating a table within database with the defined schema
const user = mongoose.model('user', userSchema)
const place = mongoose.model('place', placeSchema)

// Exporting table for querying and mutating
module.exports.user = user
module.exports.place = place