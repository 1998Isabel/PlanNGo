import uuidv4 from 'uuid/v4'
import { prependListener } from 'cluster';
const UserList = require('../models/UserList')
const MyMethods = require('../models/User')
const User = MyMethods.user
const Place = MyMethods.place

const Mutation = {
  createUser(parent, args, {db}, info){
    const { data } = args
    const hash = data.hash
    // data.totalDays -> from days of MyDayPick
    //db.userList.push(data.hash)
    console.log("Create hash",hash)
    const newUserHash = new UserList({hash})
    newUserHash.save(() => {
      console.log("Create User",hash)
    })

    const totalDays = data.totalDays.map((day,idx)=>{
      return "droppable-" + (idx+4).toString();
    })
    let days = [];
    for(var i = 0; i < data.totalDays.length+3; i++){
      days.push({
        id: "droppable-"+(i+1).toString(),
        itemsid:[]
      })
    }

    const userdetail = {
      usertoken: data.hash,
      projectName: data.projectName,
      firstDay: data.totalDays[0],
      totalDays: totalDays,
      items: [],
      days: days
    }
    const newUser = new User(userdetail)
    newUser.save(() => {
      console.log("Creat User Detail", userdetail)
    })
  },

  updateDate(parent, args, {db}, info){
    const { userid, days } = args
    // const days = data;
    console.log("in updateDate, days: ", days);
    // change days: two cases -> more days & less days
    if (days.length >= db[userid].totalDays.length) {
      console.log("more days");
      const more = days.length-db[userid].totalDays.length;
      for (var i = 0; i < more; i++){
        db[userid].days.push({
          id: "droppable-"+(db[userid].totalDays.length+4+i).toString(),
          itemsid:[]
        })        
      }
    }
    else {
      console.log("less days");
      let update_days = [];
      const types = ["eat", "favorite", "accommodation"]
      for(var i = 0; i < days.length+3; i++){
        if (i>=3) {
          update_days.push({
            id: "droppable-"+(i+1).toString(),
            itemsid:[]
          })
        }
        else {
          const items = db[userid].items.filter(item => item.place.type === types[i]);
          console.log("items", items);
          const itemsid = items.map(item=>{
            return item.id
          })
          console.log("itemsid", itemsid)
          update_days.push({
            id: "droppable-"+(i+1).toString(),
            itemsid: itemsid
          })
        }
      }
      db[userid].days = update_days;
    }

    // change firstday
    db[userid].firstDay = days[0];
    // change totalDays
    const totalDays = days.map((day,idx)=>{
      return "droppable-" + (idx+4).toString();
    })
    db[userid].totalDays = totalDays;

    return db[userid]
  },
  
  async createItem(parent, args, { db, pubsub }, info ) {
    const { userid, id, data } = args
    console.log("DATA",data)
    const mapping = {"eat": "days.0.itemsid", "favorite": "days.1.itemsid", "accommodation": "days.2.itemsid"}
    const category = mapping[data.place.type]
    const newPlace = new Place(data.place)
    const item = {
      id: data.id,
      place: newPlace
      // place: {
        // description: data.place.description,
        // placeid: data.place.placeid,
        // name: data.place.name,
        // type: data.place.type,
        // duration: data.place.duration,
        // photo: data.place.photo,
        // price: data.place.price,
        // location: data.place.location
      // }
    }
    console.log("CREATING ITEM")
    await User.updateOne({usertoken: userid}, {$addToSet: {items: item}},(err,result) =>{
      console.log(err,result)
    })
    await User.updateOne({usertoken: userid}, { $addToSet:{[category]: data.id}},(err,result) => {
      console.log(err,result)
    })

    const process = (result) => {
      // console.log("DAYS: ", result.days)
      // console.log("DAYS: ", item)
      pubsub.publish(`item ${userid}`, {
        item: {
          mutation: 'CREATED',
          data: result.days,
        }
      })
      pubsub.publish(`mapitem ${userid}`, {
        mapitem: {
          mutation: 'CREATED',
          data: item
        }
      })
    }

    process(await User.findOne({usertoken: userid}, "days"));

    return item

  },
  async updateDnDItem (parent, args, { db, pubsub }, info ) {
    const { userid, data } = args

    const toPullbuf = data.source_droppableId.replace( /^\D+/g, '')
    const toPullCol = "days." +  (toPullbuf-1)  + ".itemsid"
    const toPushbuf = data.destination_droppableId.replace( /^\D+/g, '')
    const toPushCol = "days." +  (toPushbuf-1)  + ".itemsid"
    console.log("from,to",toPullCol,toPushCol,data.draggableId)
    await User.updateOne({usertoken: userid}, { $pull:{[toPullCol]: data.draggableId}},(err,result) => {
      console.log("Dragged from",err,result)
    })
    await User.updateOne({usertoken: userid}, { $addToSet:{[toPushCol]: data.draggableId}},(err,result) => {
      console.log("Dragged to",err,result)
    })
    // let start_idx;
    // let finish_idx;
    // for (var i=0; i < update_Days.days.length; i++) {
    //   if (update_Days.days[i].id === data.source_droppableId) {
    //     start_idx = i;
    //   }
    //   if (update_Days.days[i].id === data.destination_droppableId){
    //     finish_idx = i;
    //   }
    // }

    // if (start_idx === finish_idx) {
    //   update_Days.days[start_idx].itemsid.splice(data.source_index, 1);
    //   update_Days.days[start_idx].itemsid.splice(data.destination_index, 0, data.draggableId);
    // }
    // else {
    //   update_Days.days[start_idx].itemsid.splice(data.source_index, 1);
    //   update_Days.days[finish_idx].itemsid.splice(data.destination_index, 0, data.draggableId);
    // }
    // db[userid].days = update_days

    // for subscription
    const process = (result) => {
      console.log("Drag Sub",result)
      pubsub.publish(`item ${userid}`, {
        item: {
          mutation: 'UPDATED',
          data: result.days
        }
      })
      return result.days
    }
    process(await User.findOne({usertoken: userid}, "days"))

  },

  async updateItemInfo (parent, args, { db, pubsub }, info ) {
    const { userid } = args
    const { itemId, description, price, duration } = args.data
    
    let oldplace = (await User.findOne({usertoken: userid, "items.id": itemId}, {"items.$": 1})).items[0].place
    // console.log("Old",oldplace)
    // oldplace.description = description
    // oldplace.price = price
    // oldplace.duration = duration
    // console.log("New",oldplace)
    // const newPlace = new Place(oldplace)
    await User.updateOne({usertoken: userid, "items.id": itemId}, {"items.0.place.description": description,"items.0.place.price": price, "items.0.place.duration": duration})

    let newplace = (await User.findOne({usertoken: userid, "items.id": itemId}, {"items.$": 1})).items[0]
    // let updateindex = db[userid].items.findIndex(ele => {
    //   return ele.id === data.itemid
    // })
    // db[userid].items[updateindex].place.description = data.description;
    // db[userid].items[updateindex].place.price = data.price;
    // db[userid].items[updateindex].place.duration = data.duration;

    // for subscription
    pubsub.publish(`iteminfo ${userid}`, {
      iteminfo: {
        mutation: 'UPDATED',
        data: newplace
      }
    })

    // return db[userid].items[updateindex]
    return newplace
  },

  async deleteItem(parent, args, { db, pubsub }, info) {
    const { itemId, columnId } = args.data
    const { userid } = args
    const buf = columnId.replace( /^\D+/g, '')
    const dayID = "days." +  (buf-1)  + ".itemsid"

    const process2 = (result) => {
      console.log("Delete Sub",result.items)
      pubsub.publish(`mapitem ${userid}`, {
        mapitem: {
          mutation: 'DELETED',
          data: result.items[0]
        }
      })
    }
    process2(await User.findOne({usertoken: userid, "items.id": itemId}, {"items.$": 1}))

    console.log("deleteItem", dayID,itemId, columnId)
    await User.updateOne({usertoken: userid}, {$pull: {items: {id: itemId}}},(err,result) =>{
      console.log("DELETE item",err,result)
    })
    await User.updateOne({usertoken: userid}, { $pull:{[dayID]: itemId}},(err,result) => {
      console.log("DELETE itemid",err,result)
    })
    // User.deleteOne({usertoken: userid, days: "dro"})
    // const itemsIndexinDay = db[userid].days[daysIndex].itemsid.findIndex(itemid => itemid === itemId);
    // db[userid].days[daysIndex].itemsid.splice(itemsIndexinDay, 1)
    
    const process1 = (result) => {
      pubsub.publish(`item ${userid}`, {
        item: {
          mutation: 'DELETED',
          data: result.days
        }
      })
      return result.days
    }
    
    process1(await User.findOne({usertoken: userid}, "days"))
    // process2(await User.find({usertoken: userid, "items.id": itemId}, {"items.$": 1}))
    // process2(await User.find({usertoken: userid}, {$match: {"items": {id:itemId}}}))

    //return db[userid]

  },
}

export { Mutation as default }
