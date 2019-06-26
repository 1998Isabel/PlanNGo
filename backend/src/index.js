import { GraphQLServer, PubSub } from 'graphql-yoga'
import mydb from './mydb'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import Users from './resolvers/Users'
import Day from './resolvers/Day'
const mongoose = require('mongoose')
const pubsub = new PubSub()
mongoose.connect('mongodb+srv://Henrylaih41:71DXm1PqOGM6evq9@cluster0-oxmtm.gcp.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => {
    console.log(error)
})
db.once('open', () => {
    console.log('MongoDB connected!')
})
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Users,
    Day
  },
  context: {
    db,
    pubsub
  }
})

server.start({ port: process.env.PORT | 4000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 4000}!`)
})
