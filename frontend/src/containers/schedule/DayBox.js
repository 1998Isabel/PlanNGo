import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './../../App.css';
import Item from './../../components/ScheduleCard'
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

class DayBox extends Component {
  constructor(props) {
    super(props);
  }
  handleDelete = (id, colid) => {
		this.props.handleDelete(id, colid)
	}
  render() {
    const userID = this.props.user
    let items = null;
		if (this.props.items.length != 0) {
			items = this.props.items.map((item, index) => <Item
        user={userID}
				id={item.id} key={item.id} 
				index={index} colid={this.props.column.id} place={item.place} handleDelete={this.handleDelete}/>);
    }
    const day = "DAY"+this.props.index;
    return (
      <div>
        <ListItem>
          <ListItemText primary={day} secondary={this.props.date} />
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