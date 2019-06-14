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
    },
    schedule_columns: {
        "droppable-0":{
            id: "droppable-0",
            items:['item4']
        },
    },
    spots_columns: {
        "droppable-1":{
            id: "droppable-1",
            items:[
                'item1', 'item2', 'item3'
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
};

export default initialData;