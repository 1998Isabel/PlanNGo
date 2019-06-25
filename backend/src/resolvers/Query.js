const Query = {
  loginMatch(parent,args,{db}, info){
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
}

export { Query as default }
