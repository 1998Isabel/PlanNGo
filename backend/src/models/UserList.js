const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const userlistSchema = new Schema({
    hash: String
})
// Creating a table within database with the defined schema
const userlist = mongoose.model('userlist', userSchema)

// Exporting table for querying and mutating
module.exports = userlistSchema