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
import { Element, scrollSpy, Events, Link } from 'react-scroll';


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
      const dayelement = "DAY" + (index + 1) + ""
			return (
        <Element key={column.id} name={dayelement} className="element">
          <DayBox key={column.id} column={column} items={items} index={index+1} name={dayelement} handleDelete={this.handleDelete}/>
        </Element>
      );
    })
    
    let scrolllink = () => {
      return (
        <nav className="navbar navbar-default">
          <ul className="nav navbar-nav">
            {this.props.columnOrder.map((colId, index) => {
              const column = this.props.col[colId];
              const dayelement = "DAY" + (index + 1) + ""
              return (
                <li key={index+1}><Link activeClass="active" to={dayelement} spy={true} smooth={true} duration={250} containerId="DayContainerElement">{dayelement}</Link></li>
              );
            })}
          </ul>
        </nav>
      )
    }

    return (
      <div id="left_schedule">
        <div>
          <Typography variant="h5" gutterBottom style={{marginLeft:'10px', marginTop:'10px'}}>
            Schedule
          </Typography>
          {scrolllink()}
          <span><RouteButton/></span>
        </div>
        
        <Element name="DayContainer" className="element day-fixed-size" id="DayContainerElement">
          <List className="schedule-root">
            {renderCols}
          </List>
        </Element>
        {/* <Col key={column.id} column={column} items={items} handleDelete={this.handleDelete}/> */}
        {/* <DayBox /> */}
        {/* <MyTimeLine /> */}
      </div>
    );
  }
}

export default Schedule;