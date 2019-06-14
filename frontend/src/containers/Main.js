import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './../App.css';
import Schedule from './schedule/Schedule'
import Spots from './spots/Spots'
import Map from './map/Map'
import initial_state from '../Initial';

class Main extends Component {
  constructor(props) {
		super(props);
		this.state = initial_state;
	}
  onDragEnd = (result)=> {
		const { destination, source, draggableId } = result;
		if (!destination) {
            console.log("destination empty");
            return
		}
		if (destination.droppableId === source.droppableId &&
			destination.index === source.index){
				return;
      }
    // check if source is from schedule
    let start;
    let finish;
		if (source.droppableId === "droppable-0") start = this.state.schedule_columns[source.droppableId];
    else start = this.state.spots_columns[source.droppableId];
    // check if source is from spot
    if (destination.droppableId === "droppable-0") finish = this.state.schedule_columns[destination.droppableId];
		else finish = this.state.spots_columns[destination.droppableId];
		
		if (start === finish) {
			const newTaskIds = Array.from(start.items);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);
			
			const newColumn = {
				...start,
				items: newTaskIds
      };
      let cols;
      if (source.droppableId === "droppable-0") cols = {...this.state.schedule_columns};
			else cols = {...this.state.spots_columns};
			const curr_col = cols;
      curr_col[newColumn.id]= newColumn;
      if (source.droppableId === "droppable-0")
        this.setState({
          schedule_columns:curr_col
        })
      else this.setState({
        spots_columns:curr_col
      })

			return;
		}

		const startTaskIds = Array.from(start.items);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			items: startTaskIds,
		};

		const finishTaskIds = Array.from(finish.items);
		finishTaskIds.splice(destination.index, 0,draggableId);
		const newFinish = {
			...finish,
			items: finishTaskIds,
    };
    
    let schedule_col = {...this.state.schedule_columns}
		let spot_cols = {...this.state.spots_columns};
    const curr_spot_col = spot_cols;
    const curr_sche_col = schedule_col;
    if (newStart.id==="droppable-0") curr_sche_col[newStart.id] = newStart;
		else curr_spot_col[newStart.id] = newStart;
    if (newFinish.id==="droppable-0") curr_sche_col[newFinish.id] = newFinish;
    else curr_spot_col[newFinish.id] = newFinish;
    
    this.setState({
      schedule_columns: curr_sche_col,
      spots_columns: curr_spot_col
		})

	}
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="main">
              <Schedule col={this.state.schedule_columns} items={this.state.items}/>
              <Spots col={this.state.spots_columns} items={this.state.items} columnOrder={this.state.columnOrder}/>
              <Map />
          </div>
      </DragDropContext>
    );
  }
}

export default Main;