import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './../App.css';
import Schedule from './schedule/Schedule'
import Spots from './spots/Spots'
import Map from './map/Map'


class Main extends Component {
  onDragEnd = () => {
    
  }
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="main">
              <Schedule />
              <Spots />
              <Map />
          </div>
      </DragDropContext>
    );
  }
}

export default Main;