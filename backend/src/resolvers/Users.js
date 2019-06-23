const Users = {
    items(parent, args, { db }, info) {
        console.log("user items call!!")
        // return db["Henry"].items.filter(post => {
        //   return post.author === parent.id
        // })
        return parent.itemsid.map(itemid => {
            for(var i = 0; i < db["Henry"].items.length; i++) {
                if (itemid === db["Henry"].items[i].id) {
                    return db["Henry"].items[i];
                }
            }
        })
    },
}
  
export { Users as default }
  