import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './../../App.css';
import Item from './../../components/ScheduleCard'
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import RouteButton from './../../components/RouteButton'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

class DayBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directioninfo: null
    }
  }

  componentDidMount() {
    this.props.socket.on("getRouteDetail", (data) => {
      console.log("GET", data)
      if(data){
        const infos = data;
        this.handleRouteDetail(infos)
      }
    })
  }
  handleRouteDetail = (infos) => {
    this.setState({directioninfo: infos});
  }

  handleDelete = (id, colid) => {
		this.props.handleDelete(id, colid)
  }
  handleRoute = () => {
    const data = this.props.column.id
    this.props.socket.emit("route", data)
  }
  senddetail = (id) => {
    if (this.state.directioninfo){
      const info = this.state.directioninfo.find(ele => {
        return ele.id === id
      })
      console.log("INFO", id, info)
      return info
    }
    else{
      return null
    }
    
  }
  render() {
    const userID = this.props.user
    let items = null;
		if (this.props.items.length != 0) {
			items = this.props.items.map((item, index) => <Item
        socket={this.props.socket}
        user={userID}
				id={item.id} key={item.id} 
				index={index} colid={this.props.column.id} place={item.place} handleDelete={this.handleDelete}
        detail={this.senddetail(item.id)} />);
    }
    const day = "DAY"+this.props.index;
    return (
      <div>
        <ListItem>
          <ListItemText primary={day} secondary={this.props.date} />
          <span onClick={this.handleRoute}><RouteButton /></span>
        </ListItem>
        <Divider component="li" variant="inset"/>
        <li>
          <Droppable droppableId={this.props.column.id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{minHeight:'2em'}}>
                {items}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </li>
        <Divider component="li"/>
      </div>
    );
  }
}

export default DayBox;