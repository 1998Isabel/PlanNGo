import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './../../App.css';
import MyTimeLine from './MyTimeLine'
import RouteButton from './../../components/RouteButton'

class Schedule extends Component {
  render() {
    return (
      <Droppable droppableId={1}>
        {(provided) => (
          <div id="left_schedule" ref={provided.innerRef} {...provided.droppableProps}>
            Schedule
            <RouteButton />
            {/* <MyTimeLine /> */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

export default Schedule;