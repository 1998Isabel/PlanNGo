import React, { Component } from 'react';
// import { Droppable } from 'react-beautiful-dnd';
import './../../App.css';
import MyTimeLine from './MyTimeLine'
import RouteButton from './../../components/RouteButton'
import DayBox from './DayBox'
// import Col from '../spots/Spots_col'
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Element, scrollSpy, Events, Link, scroller  } from 'react-scroll';
import {DAYS_INFO} from '../../graphql'
import { Query, Mutation } from 'react-apollo'
import {listToObjbyID} from '../../util'

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }
  handleDelete = (id, colid) => {
    this.props.handleDelete(id, colid)
  }
  handleChange = (event, newValue) => {
    this.setState({value: newValue})
  }
  scrollToWithContainer(day) {
    console.log(day)
    let goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register('end', () => {
        resolve();
        Events.scrollEvent.remove('end');
      });
      scroller.scrollTo("DayContainer", {
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    });

    goToContainer.then(() =>  
      scroller.scrollTo(day, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        containerId: "DayContainerElement",
        offset: -200,
      }));
  }
  render() {
    // const column = this.props.col["droppable-4"];
    // console.log(column);
    // const items = column.items.map(itemId=>this.props.items[itemId]);
    return(<Query query={DAYS_INFO}>
      {({loading, error, data, subscribe}) => {
        
        if (loading) return<p>Loading...</p>
        if (error) return<p>Error</p>
        const totalDays = data.users.totalDays // [droppable4,droppable5,...]
        const daysInfo = listToObjbyID(data.users.days)

        let renderCols = totalDays.map((dayId, index) => {

          const dayInfo = daysInfo[dayId];
          const items = dayInfo.items;
          const dayelement = "DAY" + (index + 1)
          return (
            <Element key={dayInfo.id} name={dayelement} className="element">
              <DayBox key={dayInfo.id} column={dayInfo} items={items} index={index + 1} name={dayelement} handleDelete={this.handleDelete} />
            </Element>
          );
        })

      let scrolllink = () => {
        return (
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              {totalDays.map((dayId, index) => {
                const column = daysInfo[dayId];
                const dayelement = "DAY" + (index + 1)
                // console.log("link")
                // console.log(dayelement)
                return (
                  <Tab key={column.id} label={dayelement} value={index} style={{ padding: 4, width: 80, minWidth: 80 }} onClick={() => this.scrollToWithContainer(dayelement)}>
                    {/* <Link key={column.id} to={dayelement} spy={true} smooth={true} duration={250} containerId="DayContainerElement">
                    </Link> */}
                    {/* <a onClick={() => this.scrollTo()} ></a> */}
                  </Tab>
                );
              })}
            </Tabs>
          </AppBar>
        )
      }
      return (
        <div id="left_schedule">
          <div>
            <Typography variant="h5" gutterBottom style={{ marginLeft: '10px', marginTop: '10px' }}>
              Schedule
              <span><RouteButton /></span>
            </Typography>
            {scrolllink()}
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
      )
  }}
  </Query>);
    
    
  }
}

export default Schedule;