import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './../../App.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocateIcon from '@material-ui/icons/LocationCity';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Col from './SpotsCol'
import { Element, scrollSpy, Events, Link } from 'react-scroll';
import { DAYS_INFO, ITEM_SUBSCRIPTION, ITEMINFO_SUBSCRIPTION } from '../../graphql'
import { Query, Mutation } from 'react-apollo'
import { listToObjbyID } from '../../util'

const totalTypes = ["droppable-1", "droppable-2", "droppable-3"]

function TabContainer(props) {
  return (
    <Element name="Container" className="element fixed-size" id="ContainerElement">
      <Typography component="div" style={{ padding: 8 }}>
        {props.children}
      </Typography>
    </Element>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


class Spots extends Component {
  constructor(props){
    super(props);
    this.state ={
      value:0
    }
  }
  
  handleChange = (e, newValue) => [
    this.setState({
      value: newValue
    })
  ]
  handleDelete = (id, colid) => {
    this.props.handleDelete(id, colid)
  }

  unsubscribe = null

  render() {
    const userID = this.props.user
    return (<Query query={DAYS_INFO} variables={{userID}} partialRefetch={true}>{
      ({loading, error, data, subscribeToMore}) => {
        if (error) return <div id="middle_spot">error!</div>
        if (loading) return <div id="middle_spot">loading...</div>
        // console.log("in spots.js", data)
        const daysInfo = listToObjbyID(data.users.days)
        let renderCols = totalTypes.map(colId => {
          const column = daysInfo[colId];
          const items = column.items;
          // console.log(items)
          return (<Col user={userID} key={column.id} column={column} items={items} handleDelete={this.handleDelete}/>);
        })

        let value = this.state.value;
        if (!this.unsubscribe) {
          this.unsubscribe = [subscribeToMore({
            document: ITEM_SUBSCRIPTION,
            variables: { id: userID },
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
            // let update_users = [...prev.users]
            // update_users = update_users.map(user=>{
            //     if (user.name!==newPost.author.name) return user
            //     let temp = user
            //     temp.posts = [newPost, ...temp.posts]
            //     return temp
            // })
            // console.log(update_users)
            // return {
            //     users: update_users
            // }
            }
        }),
        subscribeToMore({
          document: ITEMINFO_SUBSCRIPTION,
          // variables: { id: userID },
          updateQuery: (prev, { subscriptionData }) => {
            console.log("prev", prev)
            console.log("subscriptionData.data", subscriptionData.data)
            if (!subscriptionData.data) return prev
            const newItem = subscriptionData.data.iteminfo.data
            console.log("newItem", newItem);
            const updatedayindex = prev.users.days.findIndex(day => {
              return day.items.find(item => {
                return item.id === newItem.id
              })
            })
            const updateitemindex = prev.users.days[updatedayindex].items.findIndex(item => {
              return item.id === newItem.id
            })
            prev.users.days[updatedayindex].items[updateitemindex].place = newItem.place
            console.log(prev.users.days)

            return {
              ...prev,
              days: prev.users.days
            }
          }
      })]
        }
        return(
          <div id="middle_spot">
            <span>
              <Typography variant="h5" gutterBottom style={{marginLeft:'10px', marginTop:'10px'}}>
                Spots
              </Typography>
            </span>
            <div>
              {/* <AppBar position="static" color="default"> */}
              <Paper square >
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  //variant="fullWidth"
                  indicatorColor="secondary"
                  textColor="secondary"
                  variant="scrollable"
                  scrollButtons="auto"
                  size="small"
                >
                  <Tab label="Eat" icon={<RestaurantIcon /> } style={{ padding: 4, width:'30%', minWidth: 120, minHeight: 18 }} />
                  <Tab label="Favorite" icon={<FavoriteIcon />} style={{ padding: 4, width:'30%', minWidth: 120, minHeight: 18 }} />
                  <Tab label="Accommodation" icon={<LocateIcon />} style={{ padding: 4, width:'30%', minWidth: 120, minHeight: 18 }} />
                </Tabs>
              </Paper>
              {value === 0 && <TabContainer>{renderCols[0]}</TabContainer>}
              {value === 1 && <TabContainer>{renderCols[1]}</TabContainer>}
              {value === 2 && <TabContainer>{renderCols[2]}</TabContainer>}
            </div>
          </div>
        );
      }
    }</Query>);
  }
}

export default Spots;