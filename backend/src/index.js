import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './mydb'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
// import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import Users from './resolvers/Users'
import Day from './resolvers/Day'

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Post,
    Comment,
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
