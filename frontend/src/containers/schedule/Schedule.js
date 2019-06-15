import React, { Component } from 'react';
// import { Droppable } from 'react-beautiful-dnd';
import './../../App.css';
import MyTimeLine from './MyTimeLine'
import RouteButton from './../../components/RouteButton'
import DayBox from './DayBox'
// import Col from '../spots/Spots_col'
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


class Schedule extends Component {
  constructor(props) {
    super(props);
  }
  handleDelete = (id, colid) => {
    this.props.handleDelete(id, colid)
  }
  render() {
    // const column = this.props.col["droppable-4"];
    // console.log(column);
    // const items = column.items.map(itemId=>this.props.items[itemId]);
    let renderCols=this.props.columnOrder.map((colId,index )=> {
			const column = this.props.col[colId];
			const items = column.items.map(itemId=>this.props.items[itemId]);
			return (<DayBox key={column.id} column={column} items={items} index={index+1} handleDelete={this.handleDelete}/>);
		})
    return (
      <div id="left_schedule">
        <span>
          <Typography variant="h5" gutterBottom style={{marginLeft:'10px', marginTop:'10px'}}>
            Schedule
            <RouteButton/>
          </Typography>
          
        </span>
        <List className="schedule-root">
          {renderCols}
        </List>
        {/* <Col key={column.id} column={column} items={items} handleDelete={this.handleDelete}/> */}
        {/* <DayBox /> */}
        {/* <MyTimeLine /> */}
      </div>
    );
  }
}

export default Schedule;