import uuidv4 from 'uuid/v4'

const Mutation = {
  createUser(parent, args, {db}, info){
    const {data} = args
    console.log(db.userList)
    db.userList.push(data.hash)
    db[data.hash] = {
      projectName: data.projectName,
      totalDays: [],
      items: [],
      days: []
    }
    console.log("User created",data.hash,db)
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

    console.log(db[userid].items)
    console.log(db[userid].days.find((day) => {
      return (day.id === id)
    }))
    
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
    console.log("updateDnD", data)
    
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
    console.log("update_day", update_days);
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
    console.log("updateInfo", data)
    
    let updateindex = db[userid].items.findIndex(ele => {
      return ele.id === data.itemid
    })
    console.log(updateindex)
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










  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex(user => user.id === args.id)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const deletedUsers = db.users.splice(userIndex, 1)

    db.posts = db.posts.filter(post => {
      const match = post.author === args.id

      if (match) {
        db.comments = db.comments.filter(comment => comment.post !== post.id)
      }

      return !match
    })
    db.comments = db.comments.filter(comment => comment.author !== args.id)

    return deletedUsers[0]
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args
    const user = db.users.find(user => user.id === id)

    if (!user) {
      throw new Error('User not found')
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some(user => user.email === data.email)

      if (emailTaken) {
        throw new Error('Email taken')
      }

      user.email = data.email
    }

    if (typeof data.name === 'string') {
      user.name = data.name
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age
    }

    return user
  },
  createPost(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some(user => user.id === args.data.author)

    if (!userExists) {
      throw new Error('User not found')
    }

    const post = {
      id: uuidv4(),
      ...args.data
    }

    db.posts.unshift(post)

    if (args.data.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post
        }
      })
    }

    return post
  },
  deletePost(parent, args, { db, pubsub }, info) {
    const postIndex = db.posts.findIndex(post => post.id === args.id)

    if (postIndex === -1) {
      throw new Error('Post not found')
    }

    const [post] = db.posts.splice(postIndex, 1)

    db.comments = db.comments.filter(comment => comment.post !== args.id)

    if (post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: post
        }
      })
    }

    return post
  },
  updatePost(parent, args, { db, pubsub }, info) {
    const { id, data } = args
    const post = db.posts.find(post => post.id === id)
    const originalPost = { ...post }

    if (!post) {
      throw new Error('Post not found')
    }

    if (typeof data.title === 'string') {
      post.title = data.title
    }

    if (typeof data.body === 'string') {
      post.body = data.body
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published

      if (originalPost.published && !post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: originalPost
          }
        })
      } else if (!originalPost.published && post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post
          }
        })
      }
    } else if (post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'UPDATED',
          data: post
        }
      })
    }

    return post
  },
  createComment(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some(user => user.id === args.data.author)
    const postExists = db.posts.some(
      post => post.id === args.data.post && post.published
    )

    if (!userExists || !postExists) {
      throw new Error('Unable to find user and post')
    }

    const comment = {
      id: uuidv4(),
      ...args.data
    }

    db.comments.push(comment)
    pubsub.publish(`comment ${args.data.post}`, {
      comment: {
        mutation: 'CREATED',
        data: comment
      }
    })

    return comment
  },
  deleteComment(parent, args, { db, pubsub }, info) {
    const commentIndex = db.comments.findIndex(
      comment => comment.id === args.id
    )

    if (commentIndex === -1) {
      throw new Error('Comment not found')
    }

    const [deletedComment] = db.comments.splice(commentIndex, 1)
    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: 'DELETED',
        data: deletedComment
      }
    })

    return deletedComment
  },
  updateComment(parent, args, { db, pubsub }, info) {
    const { id, data } = args
    const comment = db.comments.find(comment => comment.id === id)

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (typeof data.text === 'string') {
      comment.text = data.text
    }

    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: 'UPDATED',
        data: comment
      }
    })

    return comment
  }
}

export { Mutation as default }
