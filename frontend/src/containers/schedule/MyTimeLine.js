import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

import './../../App.css';


const groups = [{ id: 1, title: 'group 1' }]

const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(1, 'hour')
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour')
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  }
]

class Schedule extends Component {
  render() {
    return (
      <div>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment().add(-1, 'hour')}
          defaultTimeEnd={moment().add(1, 'hour')}
        />
      </div>
    );
  }
}

export default Schedule;