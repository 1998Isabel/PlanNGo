const Query = {
  loginMatch(parent,args,{db}, info){
    const result = db["userList"].find((ele) => {
      return ele === args.id
    })
    return result
    
  },

  items(parent, args, {db}, info){
    if(!args.query){
      return db["Henry"].items
    }
    console.log(db["Henry"].items)

    // return db["Henry"].items.filter(item => {
    //   return item.id === args.query
    // })
  },
  
  users(parent, args, { db }, info) {
    console.log("Hi")
    console.log(db["Henry"])
    return db["Henry"]
  },

  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts
    }

    return db.posts.filter(post => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase())
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase())
      return isTitleMatch || isBodyMatch
    })
  },
  comments(parent, args, { db }, info) {
    return db.comments
  },
  post() {
    return {
      id: '092',
      title: 'GraphQL 101',
      body: '',
      published: false
    }
  }
}

export { Query as default }
