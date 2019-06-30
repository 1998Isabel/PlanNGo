const initialData = {
    items: {
        'item1':{
            id:'item1',
            description:'this is test 1'
        },
        'item2':{
            id:'item2',
            description:'this is test 2'
        },
        'item3':{
            id:'item3',
            description:'this is test 3'
        },
        'item4':{
            id:'item4',
            description:'this is test 4'
        },
        'item5':{
            id:'item5',
            description:'this is test 5'
        },
    },
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
};

export default initialData;