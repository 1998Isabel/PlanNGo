import React, { Component } from 'react';
// import { Droppable } from 'react-beautiful-dnd';
import './../../App.css';
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
import { DAYS_INFO , ITEM_SUBSCRIPTION } from '../../graphql'
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

  unsubscribe = null

  render() {
    return (<Query query={DAYS_INFO}  partialRefetch={true}>{
      ({loading, error, data, subscribeToMore}) => {
        if(error) return <div id="left_schedule">error</div>
        if(loading) return <div id="left_schedule">loading...</div>
        
        const totalDays = data.users.totalDays
        const daysInfo = listToObjbyID(data.users.days)

        let renderCols = totalDays.map((colId, index) => {
          const column = daysInfo[colId];
          const items = column.items
          const dayelement = "DAY" + (index + 1)
          return (
            <Element key={column.id} name={dayelement} className="element">
              <DayBox key={column.id} column={column} items={items} index={index + 1} name={dayelement} handleDelete={this.handleDelete} />
            </Element>
          );
        })
    
        if (!this.unsubscribe) {
          this.unsubscribe = subscribeToMore({
            document: ITEM_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              console.log("prev", prev)
              console.log("subscriptionData.data", subscriptionData.data)
              if (!subscriptionData.data) return prev
              const newDays = subscriptionData.data.item.data
              console.log("newDays", newDays);

              prev.users.days = newDays;
              console.log("update prev", prev)
              return {
                ...prev,
                days: newDays 
              }
            }})}
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
                {this.props.columnOrder.map((colId, index) => {
                  const column = this.props.col[colId];
                  const dayelement = "DAY" + (index + 1)

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
          </div>
        );
      }
    }
    </Query>);
  }
}

export default Schedule;