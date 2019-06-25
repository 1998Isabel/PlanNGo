const Query = {
  loginMatch(parent,args,{db}, info){
    console.log(args.id)
    const result = db["userList"].find((ele) => {
      return ele === args.id
    })
    return result
    
  },

  items(parent, args, {db}, info){
    return db[args.id].items
  },
  
  users(parent, args, { db }, info) {
    return db[args.id]
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
