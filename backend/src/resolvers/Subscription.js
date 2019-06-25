const Subscription = {
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.posts.find(post => post.id === postId && post.published)

      if (!post) {
        throw new Error('Post not found')
      }

      return pubsub.asyncIterator(`comment ${postId}`)
    }
  },
  post: {
    subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator('post')
    }
  },
  item: {
    subscribe(parent, { userid }, { db, pubsub }, info) {
      const user = db[userid]

      if (!user) {
        throw new Error('User not found')
      }

      return pubsub.asyncIterator(`item ${userid}`)
    }
  },
  iteminfo: {
    subscribe(parent, { userid }, { db, pubsub }, info) {
      const user = db[userid]

      if (!user) {
        throw new Error('User not found')
      }
      return pubsub.asyncIterator(`iteminfo ${userid}`)
    }
  },
  mapitem: {
    subscribe(parent, { userid }, { db, pubsub }, info) {
      const user = db[userid]

      if (!user) {
        throw new Error('User not found')
      }
      return pubsub.asyncIterator(`mapitem ${userid}`)
    }
  }
}

export { Subscription as default }
