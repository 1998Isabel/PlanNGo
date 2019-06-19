const mydb = {
    default: {

        items: [
            {
                id: 1,
                description:'this is test 1'
                // placeid: ,
                // name: ,
                // discription: ,
                // type:,
                // duration:,
                // note: ,
                // photo: ,
                // price: ,
            },
            {
                id: 2,
                description:'this is test 2'
            },
            {
                id: 3,
                description:'this is test 3'
            },
            {
                id: 4,
                description:'this is test 4'
            },
            {
                id: 5,
                description:'this is test 5'
            }
        ],
        schedule_columns: {
            "droppable-4":{
                id: "droppable-4",
                items:['item4']
            },
            "droppable-5":{
                id: "droppable-5",
                items:['item5']
            },
            "droppable-6":{
                id: "droppable-6",
                items:['item2']
            },
            "droppable-7":{
                id: "droppable-7",
                items:['item3']
            },
        },
        spots_columns: {
            "droppable-1":{
                id: "droppable-1",
                items:[
                    'item1'
                ]
            },
            "droppable-2":{
                id: "droppable-2",
                items:[]
            },
            "droppable-3":{
                id: "droppable-3",
                items:[]
            }
        },
        columnOrder: ["droppable-1","droppable-2", "droppable-3"],
        dayOrder: ["droppable-4", "droppable-5", "droppable-6", "droppable-7"]
    }
};

export default mydb;