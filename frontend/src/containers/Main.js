import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './../App.css';
import Schedule from './schedule/Schedule'
import Spots from './spots/Spots'
import Map from './map/Map'
// import Map from './map/GmapObj' //for testing
import { Redirect } from 'react-router-dom';
import initial_state from '../Initial';
import { Mutation } from 'react-apollo'
import { UPDATE_DND_ITEM } from '../graphql';


function IndexofProperty(array, attr, value) {
  for(var i = 0; i < array.length; i += 1) {
      if(array[i] === value) {
          return i;
      }
  }
  return -1;
}
function FindCol(s) {
  let tmp = parseInt(s.substring(s.lastIndexOf('-')+1), 10);
  return tmp;
}

class Main extends Component {
  constructor(props) {
		super(props);
		this.state = initial_state;
	}
  handleDelete = (id, colid) => {
    console.log(id, colid);
    let col;
    // if (colid === "droppable-4") col = {...this.state.schedule_columns};
    if (FindCol(colid) >= 4) col = {...this.state.schedule_columns};    
    else col = {...this.state.spots_columns};
    let items = {...this.state.items};

    let update_col = col;
    let update_items = items;
		let item_idx = IndexofProperty(col[colid].items, 'id', id);

    if (item_idx !== -1) {
      delete update_items[id];
      update_col[colid].items.splice(item_idx, 1);
      console.log(update_items);
      console.log(update_col);
      // if (colid === "droppable-4") {
      if (FindCol(colid) >= 4) {
        this.setState({
          schedule_columns: update_col,
          items: update_items
        });
      }
      else {
        this.setState({
          spots_columns: update_col,
          items: update_items
        });
      }
    }
  }

  onDragEnd = (result)=> {
    console.log("dnd result", result);
		const { destination, source, draggableId } = result;
		if (!destination) {
            console.log("destination empty");
            return
		}
		if (destination.droppableId === source.droppableId &&
			destination.index === source.index){
				return;
    }
    this.updateDnD({
      variables: {
        draggableId: draggableId,
        destination_droppableId: destination.droppableId,
        destination_index: destination.index,
        source_droppableId: source.droppableId,
        source_index: source.index, 
      }
    });
  }
  
  render() {
    if (this.props.user == undefined) {
      return <Redirect to="/login"/>;
    }
    
    return (
      <Mutation mutation={UPDATE_DND_ITEM}>{
        updateDnDItem => {
          console.log("updateDnDItem")
          this.updateDnD = updateDnDItem;
          return (
            <DragDropContext onDragEnd={this.onDragEnd}>
              <div className="main">
                <Schedule user = {this.props.user} col={this.state.schedule_columns} items={this.state.items} columnOrder={this.state.dayOrder} handleDelete={this.handleDelete}/>
                <Spots user = {this.props.user} col={this.state.spots_columns} items={this.state.items} columnOrder={this.state.columnOrder} handleDelete={this.handleDelete}/>
                <Map user = {this.props.user}/>
              </div>
            </DragDropContext>
          );
        }
      }
      </Mutation>
    );
  }
}

export default Main;