import React, { Component } from 'react';
import TimeLine from 'react-time-line'
import './../../App.css';

const events = [
  {ts: "2017-09-17T12:22:46.587Z", text: 'Logged in'},
  {ts: "2017-09-17T12:21:46.587Z", text: 'Clicked Home Page'},
  {ts: "2017-09-17T12:20:46.587Z", text: 'Edited Profile'},
  {ts: "2017-09-16T12:22:46.587Z", text: 'Registred'},
  {ts: "2017-09-16T12:21:46.587Z", text: 'Clicked Cart'},
  {ts: "2017-09-16T12:20:46.587Z", text: 'Clicked Checkout'},
];

class MyTimeLine extends Component {
  render() {
    return (
      <div>
        Schedule
        <TimeLine items={events} />
      </div>
    );
  }
}

export default MyTimeLine;