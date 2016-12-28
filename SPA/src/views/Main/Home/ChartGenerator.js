import React from 'react';
import api from './test/stubAPI';
import { Link } from 'react-router';
import $ from "jquery";
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';
import {BarChart} from 'react-easy-chart';
import {Legend} from 'react-easy-chart';
import {Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Header from './Header';

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
  <div >
    {suggestion.name}
  </div>
);

export default class ChartGenerator extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      data: [],
      legendData: [],
      suggestions: [],
      exerciseUnits : [],
      trainingSessions : []
    };
  }
  componentDidMount(){
	  this.getAllExerciseUnits('http://localhost:3001/api/users/' + this.props.params.user_id + '/exerciseunits/');
	  this.getAllTrainingSessions('http://localhost:3001/api/users/' + this.props.params.user_id + '/tsessions/');
  };
  populateExerciseUnits = (response) => {
		this.setState({
			exerciseUnits: response
		});
	};
	populateTrainingSessions = (response) => {
		this.setState({
			trainingSessions: response
		});
	};
  getAllTrainingSessions = (URL) => {
    $.ajax({
      type:"GET",
      dataType:"json",
      url:URL,
      success: function(response) {
        this.populateTrainingSessions(response);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  };
  getAllExerciseUnits = (URL) => {
    $.ajax({
      type:"GET",
      dataType:"json",
      url:URL,
      success: function(response) {
        this.populateExerciseUnits(response);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  };
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
  generateChartData = (exercise, date_from, date_to) => {
        
    var dateFromComponents = date_from.split("/");
    var dateFrom = new Date(dateFromComponents[2], dateFromComponents[1] -1, dateFromComponents[0]);
    var dateToComponents = date_to.split("/");
    var dateTo = new Date(dateToComponents[2], dateToComponents[1] -1, dateToComponents[0]);
    if (dateTo < dateFrom) {
      data = [];
      this.setState ({data});
      return;
    }
    
    var daysTakenIntoAccount = [];
    var tempDate;
    var tempDateComponents;
    var data = [];
    var validUnits = [];
    for (var i = 0; i < this.state.exerciseUnits.exerciseunits.length; i++) {
      if (this.state.exerciseUnits.exerciseunits[i].name == exercise) {
        validUnits.push(this.state.exerciseUnits.exerciseunits[i]);
      } 
    }
    var validTrainingSessions = [];
    for(i = 0; i < this.state.trainingSessions.tsessions.length; i++) {
      var date = this.state.trainingSessions.tsessions[i].date;
      var year = date.substring(0,4);
      var month = date.substring(5,7);
      var day = date.substring(8,10);
      var tsessionDate = new Date(year,month -1,day);
      if(tsessionDate >= dateFrom && tsessionDate <= dateTo) {
        validTrainingSessions.push(this.state.trainingSessions.tsessions[i]);
      }
    }
    console.log(validUnits);
    console.log(validTrainingSessions);
    for(i = 0; i < validUnits.length; i++) {
      for(var j = 0; j < validTrainingSessions.length; j++) {
        if(validUnits[i].tsession_id == validTrainingSessions[j]._id) {
          var date = validTrainingSessions[j].date;
          var year = date.substring(0,4);
          var month = date.substring(5,7);
          var day = date.substring(8,10);
          var dateToDisplay = day + '/' + month + '/' + year;
          data.push({'x': dateToDisplay, 'y': validUnits[i].weight});
        }
      }
    }
    var newText = '';
    // trimming dates to shortest possible format
    if(data.length > 8) {
      for (i = 0; i < data.length; i++) {
        newText = data[i].x.substring(0,5);
        if(data[i].x.substring(0,1) == '0') {
          newText = data[i].x.substring(1,5);
        } 
        if(newText.substring(2,4) == '/0'){ 
          newText = newText.substring(0,3) + newText.substring(4);
        }
        
        if (newText.substring(1,3) == '/0') {
          newText = newText.substring(0,2) + newText.substring(3);
        }
        
        data[i].x = newText;
      }
    }
    //console.log(data);
    this.setState ({data});
    
  };
  
  render() {
    //console.log(this.state.exerciseUnits);
    //console.log(this.state.trainingSessions);
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Type an exercise name',
      value,
      onChange: this.onChange
    };
    
    // Finally, render it!
    return (
      <div >
        <Header/>
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td className="col-md-2">
               <Autosuggest suggestions={suggestions} onSuggestionsFetchRequested={this.onSuggestionsFetchRequested} onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue} renderSuggestion={renderSuggestion} inputProps={inputProps} />
              </td>
              <td className="col-md-6"><ChartDataPicker exercise={this.state.value} generateChartHandler={this.generateChartData}/></td>
              <td className="col-md-4"></td>
            </tr>
          </tbody>
        </table>
        <Chart data={this.state.data} legendData={this.state.legendData}/>
      </div>
    );
  }
};

var ChartDataPicker = React.createClass( {
	getInitialState : function() {
	  return {
      status : '',
      date_from: '',
      date_to: '',
      user: '',
    };
	},
	componentDidMount(){
		this.setState({users: this.props.users});
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
			this.props.generateChartHandler(exercise,date_from, date_to);
		}
  },
	handleNameChange: function(e) {
		this.setState({user: e.target.value});
		console.log(this.state.user);
	},
	
	render: function(){
		return (
      <div>
        <td>
          <input type="text" className="form-control" placeholder="Date from: dd/mm/yyyy" value={this.state.date_from} onChange={this.handleDateFromChange} />
        </td>
        <td> 
          <input type="text" className="form-control" placeholder="Date to: dd/mm/yyyy" value={this.state.date_to} onChange={this.handleDateToChange} />
        </td>
        <td>
          <input type="button" className="btn btn-primary" value="Generate chart" onClick={this.handleGenereteChart} />
        </td>
      </div>
		)
	}
});

var margin = {top: 20, right: 20, bottom: 20, left: 40};

var Chart = React.createClass({
  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <BarChart 
          axes
          grid
          axisLabels={{x: 'Date', y: 'Weight'}} 
          colorBars 
          width={800} 
          height={450} 
          margin={margin}
          data={this.props.data} 
          margin={{top: 20, right: 60, bottom: 60, left: 80}}
          />
			</div>
    );
  }
});
