const userList = require('../models/UserList')

const Query = {
  async loginMatch(parent,args,{db}, info){
    const process = (result) => {
      if(result.length !== 0){
        return result[0].hash
      }
      return 
    }

    return process(await userList.find({hash: args.id}))
    // const result = db["userList"].find((ele) => {
    //   return ele === args.id
    // })
    // return result
    
  },

  items(parent, args, {db}, info){
    return db[args.id].items
  },
  
  users(parent, args, { db }, info) {
    return db[args.id]
  },
}

export { Query as default }
