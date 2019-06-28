import React, { Component } from 'react';
import './../../App.css';
import RouteButton from './../../components/RouteButton'
import DayBox from './DayBox'
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Element, scrollSpy, Events, Link, scroller  } from 'react-scroll';
import { DAYS_INFO , ITEM_SUBSCRIPTION } from '../../graphql'
import { Query, Mutation } from 'react-apollo'
import {listToObjbyID} from '../../util'
import moment from 'moment';

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
    const userID = this.props.user
    return (<Query query={DAYS_INFO} variables={{userID: userID}} fetchPolicy='network-only' partialRefetch={true}>{
      ({loading, error, data, subscribeToMore}) => {
        if(error) return <div id="left_schedule">error</div>
        if(loading) return <div id="left_schedule">loading...</div>
  
        const totalDays = data.users.totalDays;
        const daysInfo = listToObjbyID(data.users.days);
        //string to date object
        console.log("firstDay before!!!!!!",data.users.firstDay)
        const firstDay = data.users.firstDay.split("/");
        console.log("firstDay after!!!!!!",firstDay)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var date_obj = new Date(Date.UTC(firstDay[0], parseInt(firstDay[1])-1, firstDay[2]));
        console.log("date_obj",date_obj)

        console.log(totalDays)
        let renderCols = totalDays.map((colId, index) => {
          const column = daysInfo[colId];
          const items = column.items
          const dayelement = "DAY" + (index + 1)
          const date = moment(date_obj).add(index, 'days').toDate().toLocaleDateString('en-US', options);
          console.log("schedule", date)
          return (
            <Element key={column.id} name={dayelement} className="element">
              <DayBox socket={this.props.socket} date={date} user={userID} key={column.id} column={column} items={items} index={index + 1} name={dayelement} handleDelete={this.handleDelete} />
            </Element>
          );
        })
    
        if (!this.unsubscribe) {
          this.unsubscribe = subscribeToMore({
            document: ITEM_SUBSCRIPTION,
            variables: { userid: userID, id: userID },
            updateQuery: (prev, { subscriptionData }) => {
             
              if (!subscriptionData.data) return prev
              const newDays = subscriptionData.data.item.data
          

              prev.users.days = newDays;
           
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
                {totalDays.map((colId, index) => {
                  const column = daysInfo[colId];
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