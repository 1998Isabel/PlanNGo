import { GraphQLServer, PubSub } from 'graphql-yoga'
import mydb from './mydb'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import Users from './resolvers/Users'
import Day from './resolvers/Day'
import { Socket } from 'dgram';
const express = require('express')
const app = express()
const http = require('http').Server(app)

const MyMethods = require('./models/User')
const User = MyMethods.user

// our localhost port
const port = 4001

// Socket.io serverSocket
const serverSocket = require('socket.io')(http)
// Start server listening process.
http.listen(port, () => {
  console.log(`Server listening on port ${port}.`)
})

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
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
    serverSocket.on('connection', socket => {
      console.log('New client connected')
      // focus on the onclick item
      socket.on('cardclick', (data) => {
        socket.emit('placeclick', data)
      })
      // generate pdf
      socket.on('pdfclick', (userid)=>{
        console.log("socket_on_pdfclick!!!!!", userid);
        User.findOne({usertoken: userid}, function(err, obj){
          if (err) { console.log(err) }
          if (obj) {
            console.log(obj.items[0].place);
            console.log("SEVRER: going to generate PDF!");
            const line = {
                image: 'line',
                alignment: 'center',
                width: 550
            }
            var docDefinition = {
              content:[
                {
                  text: 'PlanNGo',
                  style: 'title',
                  alignment: 'center'
                },
                {
                  text: obj.projectName,
                  fontSize: 15,
                  alignment: 'center'
                },
                {
                  color: 'black',
                  markerColor: '#ff8e51',
                  ul: []
                }
              ],
              images: {
                 favorite:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABC0lEQVQ4T63TvyuHQRwH8NdXSikbEflRzP4IKaVkUZSYFTLIZDIZFANGEyMyYDH4E5RZogiDSSmLr06nHt+c54pbrp5736v73H2ein8alQynKWZefsvmQHOoYvuv0FUE+v4CDeIsAgM4T2FlpR1hNG4+wFgZVIcWtKE1zl1YQVgL4x3LeMAjngpz9etEHThFf8YrFiOXGMZ9sbRGHGIoEzvGOF5DvvaOQhnrWCjBNrAY2+IzmrrsLcwmsLA2X7uWgvYwmYB2MZ0L3aA7AV2jNwdqD68Qg7eYQT020RO/N+O5iP1U2gR2sIo1vMUNDViKvTSF/TJoBBe4S5TWGfvtpAzKbKPvsbJ/LRv9AHW0KxNnlePpAAAAAElFTkSuQmCC'
                ,eat: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAA30lEQVQ4T+3UoU4DURCF4a8G1RCCJ8HzAFhC+hYgGiwCREUlEoFA4ItA1tWT8g6Q4MoTNA0O1WbIkFya3nSBSq7Z2cm5/9w9e3ZbNrRaBaeb9T1qdTm2gx0Mo1mCxqk6Qq0OSRsjhO4pr78CPeAkh/4J9IGtTYDmhVErT/SIXVziNsVf9RTH2VsLusN5JQ0DnDUF7eEZ20uwdxzitSkodAfo4TQ3xRu6wUsBX/to5UFmeROBW15XGcSLWo6agkK3j8k/6NOyVWb/yKN+On9dCWgMiNS/IX47377+yp5m7QV0rEETjg6MRQAAAABJRU5ErkJggg=='
                ,accommodation: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAe0lEQVQ4T+WT0QmAMAwFr3MI4hxu4oRu4hqi4BxKoZWgKQnFftmvljyuuZQGPlrBwemAGZiAo5S3QBGyAD2wA2MJZoFWYBBdbI/zXbJAZ0rGnNy/DCUoB62xqZc3BUmN3F0TNU091Ki5QZaaqtu0I+v5/6xWMxv3p3XDL1fqHBMzFESrAAAAAElFTkSuQmCC'
                ,line:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAzoAAAAcCAYAAACprMoCAAACIklEQVR4Xu3bsQ0CQRADQCjh+y/ySzgkcpKXhSxryFntji9x8O9zznn5ESBAgAABAgQIECBAYEjgregMpekUAgQIECBAgAABAgS+AoqOh0CAAAECBAgQIECAwJyAojMXqYMIECBAgAABAgQIEFB0vAECBAgQIECAAAECBOYEFJ25SB1EgAABAgQIECBAgICi4w0QIECAAAECBAgQIDAnoOjMReogAgQIECBAgAABAgQUHW+AAAECBAgQIECAAIE5AUVnLlIHESBAgAABAgQIECCg6HgDBAgQIECAAAECBAjMCSg6c5E6iAABAgQIECBAgAABRccbIECAAAECBAgQIEBgTuBn0bnve+5YBxEgQIAAAQIECBAg0ClwXVd0MUUnymkYAQIECBAgQIAAAQJPBP5WdJ4s5z8ECBAgQIAAAQIECBBoEPCNTkMKdiBAgAABAgQIECBAICqg6EQ5DSNAgAABAgQIECBAoEFA0WlIwQ4ECBAgQIAAAQIECEQFFJ0op2EECBAgQIAAAQIECDQIKDoNKdiBAAECBAgQIECAAIGogKIT5TSMAAECBAgQIECAAIEGAUWnIQU7ECBAgAABAgQIECAQFVB0opyGESBAgAABAgQIECDQIKDoNKRgBwIECBAgQIAAAQIEogKKTpTTMAIECBAgQIAAAQIEGgQUnYYU7ECAAAECBAgQIECAQFRA0YlyGkaAAAECBAgQIECAQIPAB6Cnda2Nk4rDAAAAAElFTkSuQmCC'
              },
              styles: {
                title: {
                  bold: true, fontSize: 30
                },
                subtitle:{
                  fontSize: 15, alignment: 'center'
                },
                day:{
                  fontSize: 17, bold:true
                },
                itemHeader:{
                  fontSize: 16, bold:true
                }
              },
              defaultStyle: {
                font: 'msjh',
                fontSize: 12
              }
            }
            for (var i=0; i<obj.totalDays.length; i++) {
              docDefinition.content[2].ul.push({text:'DAY '+(i+1).toString(), style:'day'});
              //push schedule here
              let ulinDay = {type:'none', ul:[]};
              const items = obj.days[i+3].itemsid.map(itemid => {
                for(var j = 0; j < obj.items.length; j++) {
                  if (itemid === obj.items[j].id) {
                      return obj.items[j];
                  }
                }
              })
              ulinDay.ul = items.map(item=>{
                return (
                  {
                    columnGap: 6,
                    alignment: 'justify',
                    width: '50%',
                    columns: [
                      { 
                        width: 14,
                        image: item.place.type
                      },
                      {width: '*',text:[{text: item.place.name, style:'itemHeader'},
                      {text: '\nStaying time: ' + item.place.duration.toString() + ' hr'},
                      {text: '\n$: ' + item.place.price.toString()},
                      {text: '\nDescription: ' + item.place.description}]}
                    ]
                  }
                );
              })
              docDefinition.content[2].ul.push(ulinDay);
              docDefinition.content[2].ul.push(line);
            }

            socket.emit('pdfDefinition', docDefinition);
          }
        })
      })
      socket.on('route', (data) => {
        socket.emit('routeMap', (data))
      })

    })
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
