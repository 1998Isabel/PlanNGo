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
  getRangeDays = () => {
    let days = []
    let day = this.state.from
    days.push(day.toLocaleDateString())
    while (!moment(day).isSame(this.state.to)) {
      day = moment(day).add(1, 'days').toDate()
      // console.log(day)
      days.push(day.toLocaleDateString());
      // console.log(days)
    }
    this.setState({days: days})
    this.props.handleDaySubmit(days)
  }
  getInitialState = () => {
    return {
      from: undefined,
      to: undefined,
      days: [],
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
    return (
      <div className="RangeExample">
        <p style={{ textAlign: "center" }}>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
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