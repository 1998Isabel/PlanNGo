const UserList = require('../models/UserList')
const MyMethods = require('../models/User')
const User = MyMethods.user
const Place = MyMethods.place

const Query = {
  async loginMatch(parent,args,{db}, info){
    const process = (result) => {
      if(result.length !== 0){
        return result[0].hash
      }
      return 
    }

    return process(await UserList.find({hash: args.id}))
    // const result = db["userList"].find((ele) => {
    //   return ele === args.id
    // })
    // return result
    
  },

  async items(parent, args, {db}, info){
    const process = (result) => {
      console.log("in Query items", result);
      return result.items;
    }
    return process(await User.findOne({usertoken: args.id}));
    // return db[args.id].items
  },
  
  async users(parent, args, { db }, info) {
    // return db[args.id]
    const process = (result) => {
      console.log("in Query users", result);
      return result;
    }
    return process(await User.findOne({usertoken: args.id}));
  },
}

export { Query as default }
