import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './../../App.css';
import MyTimeLine from './MyTimeLine'
import RouteButton from './../../components/RouteButton'
import DayBox from './DayBox'

class Schedule extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="left_schedule">
        Schedule
        <RouteButton />
        {/* <DayBox /> */}
        {/* <MyTimeLine /> */}
      </div>
    );
  }
}

export default Schedule;