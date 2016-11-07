import React from 'react';
import './App.css';
import DayPicker, { DateUtils } from 'react-day-picker';
import { Link } from 'react-router';
import $ from "jquery";
import 'react-day-picker/lib/style.css';
import _ from 'lodash';

export default class SelectableDay extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
  }
  
  state = {
    selectedDay: null,
  };
  handleDayClick(e, day, { selected }) {
	 var user = this.props.users[0];
     var trainingSessions = user.training_sessions;
	 var trainingDays = _.pluck(trainingSessions, 'date');
	 	console.log(trainingDays);
	  var month = day.getMonth() + 1;
	  var year = day.getYear() + 1900;
	  var dayOfMonth = day.getDate();
	  var dateClicked = dayOfMonth + '/' + month + '/' + year;
	  console.log(dateClicked);
	  var sessionFound = false;
	  if(trainingDays.indexOf(dateClicked) !== -1) {
		  sessionFound = true;
		  console.log(sessionFound);
	  }
      if (!sessionFound) {
        return;
      } else {
		  
	  }
      this.setState({
        selectedDay: dateClicked
      });
  }
  render() {
    const { selectedDay } = this.state;
    return (
      <div className="centered"><div>
        <DayPicker
          selectedDays={ day => DateUtils.isSameDay(selectedDay, day) }
          onDayClick={ this.handleDayClick }
        />
		</div>
      </div>
    );
  }
};