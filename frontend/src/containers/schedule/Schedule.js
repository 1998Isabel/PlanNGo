import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './../../App.css';
import MyTimeLine from './MyTimeLine'
import RouteButton from './../../components/RouteButton'
import DayBox from './DayBox'
import Col from '../spots/Spots_col'

class Schedule extends Component {
  constructor(props) {
    super(props);
  }
  handleDelete = (id, colid) => {
    this.props.handleDelete(id, colid)
  }
  render() {
    const column = this.props.col["droppable-0"];
    console.log(column);
    const items = column.items.map(itemId=>this.props.items[itemId]);
    return (
      <div id="left_schedule">
        <span>
          Schedule
          <RouteButton />
        </span>
        <Col key={column.id} column={column} items={items} handleDelete={this.handleDelete}/>
        {/* <DayBox /> */}
        {/* <MyTimeLine /> */}
      </div>
    );
  }
}

export default Schedule;