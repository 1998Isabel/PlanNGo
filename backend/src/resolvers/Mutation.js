import uuidv4 from 'uuid/v4'

const Mutation = {
  updateDate(parent, args, {db, pubsub}, info){
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
    console.log("DAYS",db[userid].days)
    pubsub.publish(`item ${userid}`, {
      item: {
        mutation: 'UPDATED',
        data: db[userid].days
      }
    })

    return db[userid]
  },
  createUser(parent, args, {db}, info){
    const { data } = args
    // data.totalDays -> from days of MyDayPick
    db.userList.push(data.hash)
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
    db[data.hash] = {
      projectName: data.projectName,
      firstDay: data.totalDays[0],
      totalDays: totalDays,
      items: [],
      days: days
    }
  },
  createItem(parent, args, { db, pubsub }, info ) {
    const { userid, id, data } = args
    
    const item = {
      ...data
    }

    db[userid].days.find((day) => {
      return (day.id === id)
    }).itemsid.unshift(item.id)

    db[userid].items.push(item)
    pubsub.publish(`item ${userid}`, {
      item: {
        mutation: 'CREATED',
        data: db[userid].days
      }
    })
    pubsub.publish(`mapitem ${userid}`, {
      mapitem: {
        mutation: 'CREATED',
        data: item
      }
    })

    return item

  },
  updateDnDItem (parent, args, { db, pubsub }, info ) {
    const { userid, data } = args
    let update_days = db[userid].days
    let start_idx;
    let finish_idx;
    for (var i=0; i < update_days.length; i++) {
      if (update_days[i].id === data.source_droppableId) {
        start_idx = i;
      }
      if (update_days[i].id === data.destination_droppableId){
        finish_idx = i;
      }
    }

    if (start_idx === finish_idx) {
      update_days[start_idx].itemsid.splice(data.source_index, 1);
      update_days[start_idx].itemsid.splice(data.destination_index, 0, data.draggableId);
    }
    else {
      update_days[start_idx].itemsid.splice(data.source_index, 1);
      update_days[finish_idx].itemsid.splice(data.destination_index, 0, data.draggableId);
    }
    db[userid].days = update_days;

    // for subscription
    pubsub.publish(`item ${userid}`, {
      item: {
        mutation: 'UPDATED',
        data: db[userid].days
      }
    })

    return db[userid].days
  },
  updateItemInfo (parent, args, { db, pubsub }, info ) {
    const { userid, data } = args
    
    let updateindex = db[userid].items.findIndex(ele => {
      return ele.id === data.itemid
    })
    db[userid].items[updateindex].place.description = data.description;
    db[userid].items[updateindex].place.price = data.price;
    db[userid].items[updateindex].place.duration = data.duration;

    // for subscription
    pubsub.publish(`iteminfo ${userid}`, {
      iteminfo: {
        mutation: 'UPDATED',
        data: db[userid].items[updateindex]
      }
    })

    return db[userid].items[updateindex]
  },
  deleteItem(parent, args, { db, pubsub }, info) {
    const { itemId, columnId } = args.data
    const { userid } = args
    const itemsIndex = db[userid].items.findIndex(item=> item.id === itemId);
    
    // delete items
    if (itemsIndex === -1) {
      throw new Error('Item not found')
    }
    const delItem = db[userid].items[itemsIndex]
    const deletedItems = db[userid].items.splice(itemsIndex, 1);

    // delete items index in day
    const daysIndex = db[userid].days.findIndex(day => day.id === columnId);
    if (daysIndex === -1 ){
      throw new Error('Day not found')
    }
    const itemsIndexinDay = db[userid].days[daysIndex].itemsid.findIndex(itemid => itemid === itemId);
    db[userid].days[daysIndex].itemsid.splice(itemsIndexinDay, 1)
    
    pubsub.publish(`item ${userid}`, {
      item: {
        mutation: 'DELETED',
        data: db[userid].days
      }
    })
    pubsub.publish(`mapitem ${userid}`, {
      mapitem: {
        mutation: 'DELETED',
        data: delItem
      }
    })

    return db[userid]

  },
}

export { Mutation as default }
