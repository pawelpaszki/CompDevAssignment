import React from 'react';

import './App.css';
import api from './test/stubAPI';
import { Link } from 'react-router';
import $ from "jquery";
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';
import BarChart from 'react-bar-chart';
import {Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';


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
  <div >
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
	  data: [],
	  users : [],
      suggestions: [],
	  exerciseUnits : [],
	  muscleGroupSessions : [],
	  trainingSessions : [],
	  exercises : [],
    };
  }
  componentDidMount(){
	 this.getAllExerciseUnits('http://localhost:3001/exerciseunits/');
	 this.getAllMuscleGroupSessions('http://localhost:3001/musclegroupsessions/');
	 this.getAllTrainingSessions('http://localhost:3001/trainingsessions/');
	 this.getAllExercises('http://localhost:3001/exercises/');
	 this.getAllUsers('http://localhost:3001/users/');
  };
  populateExerciseUnits = (response) => {
		this.setState({
			exerciseUnits: response
		});
	 };
	 populateMuscleGroupSessions = (response) => {
		this.setState({
			muscleGroupSessions: response
		});
	 };
	 populateTrainingSessions = (response) => {
		this.setState({
			trainingSessions: response
		});
	 };
	 populateExercises = (response) => {
		this.setState({
			exercises: response
		});
	 };
	 populateUsers = (response) => {
		this.setState({
			users: response
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
  getAllMuscleGroupSessions = (URL) => {
        $.ajax({
            type:"GET",
            dataType:"json",
            url:URL,
            success: function(response) {
                this.populateMuscleGroupSessions(response);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
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
  getAllExercises = (URL) => {
	$.ajax({
		type:"GET",
		dataType:"json",
		url:URL,
		success: function(response) {
			this.populateExercises(response);
		}.bind(this),
		error: function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
  };
  getAllUsers = (URL) => {
	$.ajax({
		type:"GET",
		dataType:"json",
		url:URL,
		success: function(response) {
			this.populateUsers(response);
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
	  
		  console.log(exercise);
		  console.log(date_from);
		  console.log(date_to);
		  
		  var dateFromComponents = date_from.split("/");
		  var dateFrom = new Date(dateFromComponents[2], dateFromComponents[1] -1, dateFromComponents[0]);
		  console.log(dateFrom);
		  var dateToComponents = date_to.split("/");
		  var dateTo = new Date(dateToComponents[2], dateToComponents[1] -1, dateToComponents[0]);
		  console.log(dateTo);
		  
		  var users = this.state.users;
		  var user = users[this.props.params.id];
		  console.log("user: " + user);
		  console.log("id: " + this.props.params.id);
		  var trainingDays = [];
		  var trainingSessionIds = [];
		  for(var i = 0; i < this.state.trainingSessions.length; i++) {
			  if(this.state.trainingSessions[i].user_id == this.props.params.id) {
				  trainingDays.push({'date': this.state.trainingSessions[i].date, 'training_session_id': this.state.trainingSessions[i].id});
			  }
		  };
		  var muscleGroup = '';
		  for(i = 0; i < this.state.exercises.length; i++) {
			    if(this.state.exercises[i].name == exercise) {
					muscleGroup = this.state.exercises[i].group;
				}
		  };
		  var daysTakenIntoAccount = [];
		  var tempDate;
		  var tempDateComponents;
		  var data = [];
		  for (i = 0; i < trainingDays.length; i++) {
			  tempDateComponents = trainingDays[i].date.split("/");
		      tempDate = new Date(tempDateComponents[2], tempDateComponents[1] - 1, tempDateComponents[0]);
			  if (tempDate >= dateFrom && tempDate <= dateTo) {
				  daysTakenIntoAccount.push(trainingDays[i].date);
			  }
		  };
		  console.log(daysTakenIntoAccount);
		  for(i = 0; i < trainingDays.length; i++) {
			  for(var j = 0; j < trainingDays.length; j++) {
				  
			  }
		  }
		  
		  console.log("muscleGroupSessions");
		  console.log(this.state.muscleGroupSessions);
		  for(i = 0; i < trainingDays.length; i++) {
			  for(var j = 0; j < this.state.muscleGroupSessions.length; j++) {
				  for(var k = 0; k < this.state.exerciseUnits.length; k++) {
					  if(this.state.muscleGroupSessions[j].name == muscleGroup) {
						  if(this.state.muscleGroupSessions[j].main_session_id == trainingDays[i].training_session_id) {
							  if(this.state.exerciseUnits[k].name == exercise && this.state.exerciseUnits[k].muscle_group_session_id == this.state.muscleGroupSessions[j].id) {
								  data.push({'text': trainingDays[i].date, 'value': this.state.exerciseUnits[k].weight});
							  } 
						  }
					  }
				  }
		      };
		  };
		  console.log("data");
		  console.log(data);
		  
		  this.setState ({data});
			
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
	  <div >
	  	    <Link to="/home" ><button style={{marginRight: 1 + 'em', marginTop: 1 + 'em', paddingLeft: 10 + 'px', paddingRight: 6 + 'px'}} className="nav btn-primary navbar-nav navbar-right">Home</button></Link>
		<Link to="/muscles" ><button style={{marginRight: 1 + 'em',  marginTop: 1 + 'em', paddingLeft: 10 + 'px', paddingRight: 6 + 'px'}} className="nav btn-primary navbar-nav navbar-right">Muscles & Exercises</button></Link>
		<h3></h3>
		<Button style={{marginLeft: 2 + 'em', marginTop: 1 + 'em', marginBottom: 1 + 'em', paddingLeft: 1 + 'em'}} className="btn primary-btn"onClick={browserHistory.goBack}>Go back</Button>
		<table className="table table-borderless">
				<tbody>
				  <tr>
					<td className="col-md-2">
					 <Autosuggest 
						suggestions={suggestions}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						getSuggestionValue={getSuggestionValue}
						renderSuggestion={renderSuggestion}
						inputProps={inputProps} 
					  />
					  </td>
					  <td className="col-md-6"><ChartDataPicker exercise={this.state.value} generateChartHandler={this.generateChartData} users={this.state.users}/></td>
					  <td className="col-md-4"></td>
				  </tr>
				</tbody>
			</table>
	    <Chart data={this.state.data}/>
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
			this.setState({date_from: ""});
			this.setState({date_to: ""});
		}
    },
	handleNameChange: function(e) {
		this.setState({user: e.target.value});
		console.log(this.state.user);
	},
	
	
	render: function(){
		return (
		<div >
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

var margin = {top: 20, right: 20, bottom: 30, left: 40};

var Chart = React.createClass({
  render() {
    return (
        <div>
		
		<div className="col-md-6 col-md-offset-3">
                <BarChart ylabel='kg'
                  width={800} //this.state.width
                  height={600}
                  margin={margin}
                  data={this.props.data}/>
			</div>
        </div>
    );
  }
});
