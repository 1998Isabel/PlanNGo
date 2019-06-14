import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from '../../components/test_card'

class Column extends Component {
    render() {
        let items = null;
        if (this.props.items.length!=0) {
            items = this.props.items.map((item, index) => <Item 
            id={item.id}  key={item.id} description={item.description} 
            index={index} colid={this.props.column.id}/>);
        }
        return(
            <Droppable droppableId={this.props.column.id}>
                {(provided)=>(
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {items}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}

export default Column;