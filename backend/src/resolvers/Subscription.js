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
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator('post')
    }
  },
  item: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator('item')
    }
  },
  iteminfo: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator('iteminfo')
    }
  },
  mapitem: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator('mapitem')
    }
  }
}

export { Subscription as default }
