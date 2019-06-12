import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './../App.css';
import Schedule from './schedule/Schedule'
import Spots from './spots/Spots'
import Map from './map/Map'

class Main extends Component {
  render() {
    return (
      <DragDropContext>
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