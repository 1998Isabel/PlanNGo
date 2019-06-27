const Subscription = {
  item: {
    subscribe(parent, { userid }, { db, pubsub }, info) {
      // const user = await User.findOne({usertoken: userid})

      // if (!user) {
      //   throw new Error('User not found')
      // }

      return pubsub.asyncIterator(`item ${userid}`)
    }
  },
  iteminfo: {
    subscribe(parent, { userid }, { db, pubsub }, info) {
      // const user = await User.findOne({usertoken: userid})

      // if (!user) {
      //   throw new Error('User not found')
      // }
      return pubsub.asyncIterator(`iteminfo ${userid}`)
    }
  },
  mapitem: {
    subscribe(parent, { userid }, { db, pubsub }, info) {
      // const user = await User.findOne({usertoken: userid})

      // if (!user) {
      //   throw new Error('User not found')
      // }
      return pubsub.asyncIterator(`mapitem ${userid}`)
    }
  }
}

export { Subscription as default }
