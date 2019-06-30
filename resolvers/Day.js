const MyMethods = require('../models/User')
const User = MyMethods.user

const Day = {
    async items(parent, args, { db }, info) {
        const process = (result) => {
            return parent.itemsid.map(itemid => {
                for(var i = 0; i < result.items.length; i++) {
                    if (itemid === result.items[i].id) {
                        return result.items[i];
                    }
                }
            })
        }
        return process(await User.findOne({usertoken: args.id}));
    },
}

export {Day as default}