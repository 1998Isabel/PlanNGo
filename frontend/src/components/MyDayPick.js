import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment';
import 'react-day-picker/lib/style.css';
import './../App.css'

export default class MyDayPick extends Component {
  static defaultProps = {
    numberOfMonths: 1,
  };
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getRangeDays = (e) => {
    e.preventDefault(); // do not redirect

    let days = []
    let day = this.state.from
    days.push(moment(day).format('YYYY/MM/DD'))
    while (!moment(day).isSame(this.state.to)) {
      day = moment(day).add(1, 'days').toDate()
      // console.log(day)
      days.push(moment(day).format('YYYY/MM/DD'));
      // console.log(days)
    }
    this.setState({days: days, submitted:true})
    if (this.props.InNewProject) {
      this.props.daySubmit(days);
    }
    else {
      this.props.onClick(days)
      // if days.length >= 1, 
      // updateDate mutation here
      // userid = this.props.user
      // variables:{userid: this.props.user, days:days}
    }
  }
  getInitialState = () => {
    return {
      from: undefined,
      to: undefined,
      days: [],
      submitted: false
    };
  }
  handleDayClick = (day) => {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }
  handleResetClick = () => {
    this.setState(this.getInitialState());
  }
  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    console.log("In my day pick", this.state)
    return (
      <div className="RangeExample">
        <p style={{ textAlign: "center" }}>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `${moment(from).format('YYYY/MM/DD')} to
                ${moment(to).format('YYYY/MM/DD')}`}{' '}
          
            {from &&
              to && (
                <button className="link" onClick={this.handleResetClick}>
                  Reset
                </button>
              )}
            {from &&
              to && (
            <button className="link" onClick={this.getRangeDays}>
              Submit
            </button>
            )}
        </p>
        {this.state.submitted?<p>Submitted successfully!</p>:<p></p>}
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}