import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './../../App.css';
import Item from './../../components/test_card'
// 這邊的item應該換成像LINE那種簡易型

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


const placeinfo = {
	name: "Taipei101",
	type: "FAVORITE",
	staying: "one hour",
	note: "Go to the top of the building... (should be able to edited)",
	photo: "http://images.skyscrapercenter.com/building/tapei101_ext-mainup_(c)taipeifinancial.jpg"
}

class DayBox extends Component {
  constructor(props) {
    super(props);
  }
  handleDelete = (id, colid) => {
		this.props.handleDelete(id, colid)
	}
  render() {
    let items = null;
		if (this.props.items.length != 0) {
			items = this.props.items.map((item, index) => <Item
				id={item.id} key={item.id} description={item.description}
				index={index} colid={this.props.column.id} place={placeinfo} handleDelete={this.handleDelete}/>);
    }
    const day = "DAY"+this.props.index;
    return (
      <div>
        <ListItem>
          <ListItemText primary={day} secondary="Jan 9, 2014" />
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