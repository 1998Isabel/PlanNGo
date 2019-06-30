function listToObjbyID(list){
    let obj = {}
    // console.log("HIIII",list)
    list.forEach((elem) => {
        obj[elem.id] = elem
    })
    return obj
}

export {listToObjbyID} 