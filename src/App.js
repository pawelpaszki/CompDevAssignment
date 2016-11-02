import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import BarChart from 'react-bar-chart';
import './App.css';
//const low = require('lowdb');
import api from './test/stubAPI';
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';

// Imagine you have a list of languages that you'd like to autosuggest.

const exercises = api.getAllExercises();
const languages = exercises;

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
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

class ExerciseNamePick extends React.Component {
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
      suggestions: getSuggestions(value)
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
 
var margin = {top: 20, right: 20, bottom: 30, left: 40};

var EditProfileForm = React.createClass({
	render() {
		return (
			<div className="centered">
			
			  <input type="text" className="form-control" 
                     placeholder="First name"/>
					 
			 <input type="text" className="form-control" 
                     placeholder="Surname"/>
			 <input type="text" className="form-control" 
                     placeholder="DOB"/>
			 <input type="text" className="form-control" 
                     placeholder="Training from"/>
				<input type="fluid button" className="btn btn-primary btn-block" value="Submit"
                       onClick={this.handleSubmit} />
			  
		 </div>
		)
	}
});

var Chart = React.createClass({
  render() {
    return (
	
        <div className="main-content-with-search-box">
		<div style={{width: '50%'}}>
		 
                <BarChart ylabel='kg'
                  width={600} //this.state.width
                  height={400}
                  margin={margin}
                  data={this.props.data}/>
			</div>
            
        </div>
 
    );
  }
});

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
		
		function isValidDate(dateString)
		{
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
		<div className="search-box">
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
})
var SearchBox = React.createClass({
	handleChange : function(e, type,value) {
           e.preventDefault();
           this.props.onUserInput( type,value);
      },
      handleTextChange : function(e) {
          this.handleChange( e, 'search', e.target.value);
      },
      handleSortChange : function(e) {
          this.handleChange(e, 'sort', e.target.value);
      },
  render: function(){
    return (
      <div className="search-box">
        <input type="text" placeholder="Search" value={this.props.filterText}
                          onChange={this.handleTextChange}/>
        Sort by:
        <select id="sort" value={this.props.order } 
                         onChange={this.handleSortChange} >
                       <option value="dob">Newest</option>
					   <option value="training_from">Training (Years)</option>
                     </select>
      </div>
    );
  }
});

var UserInfo = React.createClass({
	render: function() {
		return (
		<div>
		<div className="left-within-main">
		 <table className="table">
    <thead>
      <tr>
        <th>User name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>dob</td>
      </tr>
      <tr>
        <td>number of sessions</td>
      </tr>
    </tbody>
  </table>
		</div>
		<div className="right-within-main">
		<img className="thumb" src="assets/users/4.jpg" alt="placeholder"/>
		</div>
		</div>
		
		)
	}
	
});

var ExerciseInfo = React.createClass({
	render: function() {
		return (
		<div>
		<div className="left-within-main">
		 <h1>Bench press</h1>
		</div>
		<div className="right-within-main">
		<img src="assets/exercises/flatbench.jpg" alt="placeholder"/>
		</div>
		</div>
		
		)
	}
	
});

var Sidebar = React.createClass({
  render: function(){
	  return (
		<div className="side-bar">
		  <div className="list-group">
			<a href="#" className="list-group-item">Training Sessions</a>
			<a href="#" className="list-group-item">Graphs</a>
			<a href="#" className="list-group-item">Calendar</a>
		  </div>
		</div>
		)
  }	
});

var User = React.createClass({
	render: function() {
		var userItem = this.props.userItem;
		return (
		<li>
			<img className="thumb" src={userItem.picture} alt={userItem.first_name}/>
			<a href={"/users/" + userItem.id}>{userItem.first_name} {userItem.surname}</a>
		</li>
		)
	}
});
	

var FilteredUsersList = React.createClass({
	render: function() {
		var displayedUsers = this.props.users.map((user) =>{
			return <User key={user.id} userItem={user} />;
		}) ;
            return (
			<div className="main-content-with-search-box">
                      <ul className="users">
                          {displayedUsers}
                      </ul>
                    </div>
              ) ;
	}
});

var Session = React.createClass({
	render: function() {
		var sessionItem = this.props.sessionItem;
		return (
		
		<li>
		<div className="left-within-main">
<table className="table table-borderless">
    <tbody>
      <tr>
	      <td className="col-md-3"><a  href={"/sessions/" + sessionItem.id}>{sessionItem.name} </a></td>
    <td className="col-md-6"><input type="button"  className="btn btn-warning" value="delete"/></td>
    <td className="col-md-2"></td>
    <td className="col-md-1"></td>
      </tr>
    </tbody>
  </table>
			 </div>
		</li>
		)
	}
});


var SessionsList = React.createClass({
	render: function() {
		var displayedSessions = this.props.msessions.map((session) =>{
			return <Session key={session.id} sessionItem={session} />;
		}) ;
            return (
                    <div className="main-content">
                      <ul className="users">
                          {displayedSessions}
                      </ul>
                    </div>
              ) ;
	}
});

var AddExerciseUnitForm = React.createClass({
	render: function() {
            return (
			
				<div className="left-within-main">
										<table className="table table-borderless">
    <tbody>
      <tr>
	      
    <td className="col-md-4"><input type="text" className="form-control" 
				 placeholder="Type exercise name"
		  /></td>
    <td className="col-md-3"><input type="button" className="btn btn-primary" value="Add Exercise"
				   onClick={this.fillInLater} /> </td>
				   <td className="col-md-1"></td>
    <td className="col-md-4"> </td>
      </tr>
    </tbody>
  </table>
				</div>
				

		  ) ;
	}
});

var AddExerciseForm = React.createClass({
	render: function() {
            return (
			
				<div className="left-within-main">
										<table className="table table-borderless">
    <tbody>
      <tr>
	      
    <td className="col-md-4"><input type="text" className="form-control" 
				 placeholder="Exercise name"
		  /></td>
    <td className="col-md-3"><input type="button" className="btn btn-primary" value="Add new exercise"
				   onClick={this.fillInLater} /> </td>
				   <td className="col-md-1"></td>
    <td className="col-md-4"> </td>
      </tr>
    </tbody>
  </table>
				</div>
				

		  ) ;
	}
});

var Muscle = React.createClass({
	render: function() {
		var muscle = this.props.muscle;
		return (
		
		<li>
		<div className="left-within-main">
<table className="table table-borderless">
    <tbody>
      <tr>
	      <td className="col-md-6"><a  href={"/sessions/" + muscle.name}>{muscle.name} </a></td>
    <td className="col-md-2"><input type="button"  className="btn btn-primary btn-block" value="edit"/></td>
    <td className="col-md-2"><input type="button"  className="btn btn-warning btn-block" value="delete"/></td>
    <td className="col-md-2"></td>
      </tr>
    </tbody>
  </table>
			 </div>
		</li>
		)
	}
});


var MuscleList = React.createClass({
	render: function() {
		var displayedMuscles = this.props.muscles.map((muscle) =>{
			return <Muscle key={muscle.name} muscle={muscle} />;
		}) ;
            return (
                    <div className="main-content">
                      <ul className="users">
                          {displayedMuscles}
                      </ul>
                    </div>
              ) ;
	}
});

var Exercise = React.createClass({
	render: function() {
		var exercise = this.props.exercise;
		return (
		
		<li>
		<div className="left-within-main">
<table className="table table-borderless">
    <tbody>
      <tr>
	      <td className="col-md-6"><a  href={"/exercises/" + exercise.name}>{exercise.name} </a></td>
    <td className="col-md-2"><input type="button"  className="btn btn-primary btn-block" value="edit"/></td>
    <td className="col-md-2"><input type="button"  className="btn btn-warning btn-block" value="delete"/></td>
    <td className="col-md-2"></td>
      </tr>
    </tbody>
  </table>
			 </div>
		</li>
		)
	}
});


var ExerciseList = React.createClass({
	render: function() {
		var Exercises = this.props.exercises.map((exercise) =>{
			return <Exercise key={exercise.name} exercise={exercise} />;
		}) ;
            return (
                    <div className="main-content">
                      <ul className="users">
                          {Exercises}
                      </ul>
                    </div>
              ) ;
	}
});

var ExerciseUnit = React.createClass({
	render: function() {
		var exerciseUnit = this.props.exerciseUnit;
		return (
		
		<li>
		<div className="left-within-main">
<table className="table table-borderless">
    <tbody>
      <tr>
	      <td className="col-md-6"><a  href={"/sessions/" + exerciseUnit.name}>{exerciseUnit.name} </a></td>
    <td className="col-md-2"><input type="button"  className="btn btn-primary btn-block" value="edit"/></td>
    <td className="col-md-2"><input type="button"  className="btn btn-warning btn-block" value="delete"/></td>
    <td className="col-md-2"></td>
      </tr>
    </tbody>
  </table>
			 </div>
		</li>
		)
	}
});


var ExerciseUnitList = React.createClass({
	render: function() {
		var displayedExercises = this.props.exerciseUnits.map((exercise) =>{
			return <ExerciseUnit key={exercise.name} exerciseUnit={exercise} />;
		}) ;
            return (
                    <div className="main-content">
                      <ul className="users">
                          {displayedExercises}
                      </ul>
                    </div>
              ) ;
	}
});

var TrainingSession = React.createClass({
	render: function() {
		var trainingSessionItem = this.props.trainingSessionItem;
		return (
		<li >
			<a  href={"/tsessions/" + trainingSessionItem.date}>{trainingSessionItem.date}</a>
		</li>
		)
	}
});

var FilteredTrainingSessionsList = React.createClass({
	render: function() {
		var user = this.props.users[0];
		var displayedTsessions = user.training_sessions.map((tsession) =>{
			return <TrainingSession key={tsession.id} trainingSessionItem={tsession} />;
		}) ;
            return (
                    <div className="main-content">
                      <ul className="users">
                          {displayedTsessions}
                      </ul>
                    </div>
              ) ;
	}
});

var AddMuscleGroupSessionForm = React.createClass({
	render: function() {
            return (
			
				<div className="left-within-main">
				<table className="table table-borderless">
    <tbody>
      <tr>
	      
    <td className="col-md-4"><input type="text" className="form-control" 
				 placeholder="Type muscle group"/></td>
    <td className="col-md-3"><input type="button" className="btn btn-primary" value="Add muscle group"
				   onClick={this.fillInLater} /> </td>
				   <td className="col-md-1"></td>
    <td className="col-md-4"> </td>
      </tr>
    </tbody>
  </table>
				
				</div>
		  ) ;
	}
});

var AddMuscleForm = React.createClass({
	render: function() {
            return (
			
				<div className="left-within-main">
				<table className="table table-borderless">
    <tbody>
      <tr>
	      
    <td className="col-md-4"><input type="text" className="form-control" 
				 placeholder="Add new muscle"/></td>
    <td className="col-md-3"><input type="button" className="btn btn-primary" value="Add muscle"
				   onClick={this.fillInLater} /> </td>
				   <td className="col-md-1"></td>
    <td className="col-md-4"> </td>
      </tr>
    </tbody>
  </table>
				
				</div>
				) ;
	}
});

var MainContent = React.createClass({
	render: function() {
		return (
		//{/* conditional... !!!!!!!!!!! */}
		<div> {/*className="main-content-without-search-box">*/}
		{/*<EditProfileForm/>*/}
		
		{/*<UserInfo />*/}
		{/*<FilteredUsersList  users={this.props.users}/>*/}
		{/*<FilteredTrainingSessionsList users={this.props.users} />*/}
		{/*<SessionsList  msessions={this.props.msessions}/>*/}
		{/*<AddMuscleGroupSessionForm/>*/}
			{/*<ExerciseUnitList exerciseUnits={this.props.exerciseUnits}/>*/}
		{/*<MuscleList muscles={this.props.muscles}/>*/}
		{/*<AddMuscleForm/>*/}
		{/*<ExerciseList exercises={this.props.exercises}/>*/}
		{/*<ExerciseInfo/>*/}
		<div className="calendar">
		
		{/*<AddMuscleGroupSessionForm/>*/}
		{/*<AddExerciseUnitForm/>*/}
		{/*<AddExerciseUnitForm/>*/}
		{/*<AddExerciseForm/>*/}
		</div>
		</div>
		)
	}
});

var GymProgressLogger = React.createClass({
	getInitialState: function() {
	    return { 
		 search: '', 
		 sort: 'dob',
		 data: [{text: '0', value: 0}]
		};
      },
	  handleChange : function(type,value) {
        if ( type == 'search' ) {
            this.setState( { search: value } ) ;
          } else {
             this.setState( { sort: value } ) ;
          }
      }, 
	  generateChartData: function(exercise, date_from, date_to) {
		  console.log(exercise);
		  console.log(date_from);
		  console.log(date_to);
		  var dateFromComponents = date_from.split("/");
		  var dateFrom = new Date(dateFromComponents[2], dateFromComponents[1] -1, dateFromComponents[0]);
		  console.log(dateFrom);
		  var dateToComponents = date_to.split("/");
		  var dateTo = new Date(dateToComponents[2], dateToComponents[1] -1, dateToComponents[0]);
		  console.log(dateTo);
		  var users = api.getAllUsers();
		  var user = users[0]; // parameterise later
		  var trainingSessions = user.training_sessions;
	      var trainingDays = _.pluck(trainingSessions, 'date');
		  var daysTakenIntoAccount = [];
		  var tempDate;
		  var tempDateComponents;
		  var data = [];
		  for (var i = 0; i < trainingDays.length; i++) {
			  tempDateComponents = trainingDays[i].split("/");
		      tempDate = new Date(tempDateComponents[2], tempDateComponents[1] - 1, tempDateComponents[0]);
			  if (tempDate >= dateFrom && tempDate <= dateTo) {
				  daysTakenIntoAccount.push(trainingDays[i]);
			  }
		  }
		  console.log(trainingSessions);
		  var dataRows = "const data = [\r\n";
		  var muscleGroupSessions;
		  var exercises;
		  var dataRow;
		  for (var a = 0; a < trainingSessions.length; a++) {
			  muscleGroupSessions = trainingSessions[a].muscle_group_sessions;
			  if (daysTakenIntoAccount.indexOf(trainingSessions[a].date) !== -1) {
			      for(var b = 0; b < muscleGroupSessions.length; b++) {
					  exercises = muscleGroupSessions[b].exercises;
					  for(var c = 0; c < exercises.length; c++) {
						  if(exercises[c].name === exercise) {
							  data.push({'text': trainingSessions[a].date.substring(0,5), 'value': exercises[c].weight}); 
						  }
					  }
				  }
			  }
		  }
		  this.setState ({data})
	  },
  render: function(){
	   var users = api.getAllUsers();
	   var userList = users.filter(function(p) {
		   var name = p.first_name + ' ' + p.surname;
                  return name.toLowerCase().search(
                      this.state.search.toLowerCase() ) != -1 ;
                    }.bind(this) );
            var filteredList = _.sortBy(userList, this.state.sort) ;
	 
	  var exercises = api.getAllExercises();
	  var muscles = api.getAllMuscles();
	  var exerciseUnits = api.getAllExerciseUnits();
	  var muscleSessions = api.getAllMuscleSessions();
	  return (
	  <div>
	  
		<Navbar />
        <Sidebar/>
		{/*<MonthPicker/>*/}
		{/*<SearchBox onUserInput={this.handleChange } 
                           filterText={this.state.search} 
                           sort={this.state.sort}/>*/}
		
		{/*<ChartDataPicker/>*/}
		{/*<SelectableDay users={users}/>*/}
		<ExerciseNamePick exercises={exercises} generateChartHandler={this.generateChartData}/>
        <MainContent users={filteredList} 
		msessions={muscleSessions} exerciseUnits={exerciseUnits} 
		muscles={muscles} exercises={exercises}/>
		
		<Chart data={this.state.data}/>
		
		  <Footer />
		  </div>
	  );
  }
});

export default GymProgressLogger;
