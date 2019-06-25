const Users = {
    items(parent, args, { db }, info) {
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
  