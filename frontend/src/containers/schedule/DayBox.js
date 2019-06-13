import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './../../App.css';
import Item from './../../components/Item'

class DayBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Droppable droppableId={1}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Item index={1} id={1}/>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

export default DayBox;