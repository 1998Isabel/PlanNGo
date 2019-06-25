import uuidv4 from 'uuid/v4'

const Mutation = {
  createUser(parent, args, {db}, info){
    const {data} = args
    db.userList.push(data.hash)
    db[data.hash] = {
      projectName: data.projectName,
      totalDays: [],
      items: [],
      days: []
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
