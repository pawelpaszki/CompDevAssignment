import React from 'react';

import './App.css';
import api from './test/stubAPI';
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';

function isValidDate(dateString) {
	// First check for the pattern
	if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
		return false;

	// Parse the date parts to integers
	var parts = dateString.split("/");
	var day = parseInt(parts[0], 10);
	var month = parseInt(parts[1], 10);
	var year = parseInt(parts[2], 10);

	// Check the ranges of month and year
	if(year < 1000 || year > 3000 || month == 0 || month > 12)
		return false;

	var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

	// Adjust for leap years
	if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
		monthLength[1] = 29;

	// Check the range of the day
	return day > 0 && day <= monthLength[month - 1];
};

// Imagine you have a list of exercises that you'd like to autosuggest.

const exercises = api.getAllExercises();

// Teach Autosuggest how to calculate suggestions for any given input value.
const getExerciseSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : exercises.filter(exercise =>
    exercise.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};


// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

export default class ExerciseNamePick extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getExerciseSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  
  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Type an exercise name',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
	<div>
	  <div className="exercisePicker">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} 
      />
	  
	  </div>
	  <ChartDataPicker exercise={this.state.value} generateChartHandler={this.props.generateChartHandler}/>
	  </div>
    );
  }
};

var ChartDataPicker = React.createClass( {
	getInitialState : function() {
	   return {
		status : '',
		date_from: '',
		date_to: ''
	   } ;
	},
	handleDateFromChange: function(e) {
        this.setState({date_from: e.target.value});
    },
    handleDateToChange: function(e) {
	    this.setState({date_to: e.target.value});
    },
    handleGenereteChart: function(e) {
		if(!isValidDate(this.state.date_from)) {
			this.setState({date_from: "type valid date"});
		} 
		if(!isValidDate(this.state.date_to)) {
			this.setState({date_to: "type valid date"});
		}
		if (isValidDate(this.state.date_from) && isValidDate(this.state.date_to)) {
			var date_from = this.state.date_from;
			var date_to = this.state.date_to;
			var exercise = this.props.exercise;
			this.props.generateChartHandler(exercise, date_from, date_to);
			this.setState({date_from: ""});
			this.setState({date_to: ""});
		}
    },
	
	render: function(){
		return (
		<div className="right-aligned-form">
		  <td>
		  <input type="text" className="form-control"
				 placeholder="Date from: dd/mm/yyyy" value={this.state.date_from}
                     onChange={this.handleDateFromChange}
		  />
		  </td>
		  <td>
		  <input type="text" className="form-control" 
				 placeholder="Date to: dd/mm/yyyy" value={this.state.date_to}
                     onChange={this.handleDateToChange}
		  />
		  </td>
		  <td>
		  <input type="button" className="btn btn-primary" value="Generate chart"
				   onClick={this.handleGenereteChart} />
		  </td>
      </div>
		)
	}
});