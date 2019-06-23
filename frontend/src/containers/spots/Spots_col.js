import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from '../../components/test_card'

const placeinfo = {
	name: "Taipei101",
	type: "FAVORITE",
	staying: "one hour",
	note: "Go to the top of the building... (should be able to edited)",
	photo: "http://images.skyscrapercenter.com/building/tapei101_ext-mainup_(c)taipeifinancial.jpg"
}

class Column extends Component {
	handleDelete = (id, colid) => {
		this.props.handleDelete(id, colid)
	}
	render() {
		let items = null;
		if (this.props.items.length != 0) {
			console.log(this.props.items)
			items = this.props.items.map((item, index) => <Item
				id={item.id} key={item.id} 
				index={index} colid={this.props.column.id} place={item.place} handleDelete={this.handleDelete}/>);
		}
		return (
			<Droppable droppableId={this.props.column.id}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps} style={{minHeight:'10em'}}>
						{items}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		);
	}
}

export default Column;