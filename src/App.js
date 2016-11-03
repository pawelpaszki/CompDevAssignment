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
	 getInitialState : function() {
	   return {
		status : '',
		first_name: this.props.user.first_name,
		surname: this.props.user.surname,
		dob: this.props.user.dob,
		training_from: this.props.user.training_from
	   } ;
	},
	handleFirstNameChange: function(e) {
        this.setState({first_name: e.target.value});
    },
	handleSurnameChange: function(e) {
        this.setState({surname: e.target.value});
    },
	handleDOBChange: function(e) {
        this.setState({dob: e.target.value});
    },
	handleTrainingFromChange: function(e) {
        this.setState({training_from: e.target.value});
    },
	handleUpdateProfile: function(e) {
		e.preventDefault();
		
		var first_name = this.state.first_name.trim();
		var surname = this.state.surname.trim();
		var dob = this.state.dob.trim();
		var training_from = this.state.training_from.trim();
		
		var key = this.props.user.id;
		if (isValidDate(dob) && isValidDate(training_from)) {
			this.props.profileUpdateHandler(key, first_name, surname, dob, training_from);
		} else {
			this.setState({dob: 'dd/mm/yyyy date required'})
			this.setState({training_from: 'dd/mm/yyyy date required'})
		}
	},
	render() {
		return (
		<div className="main-content-without-search-box">
			<div className="centered">
			<table>
			<tbody>
			<td key={'first_name'}><input type="text" className="form-control" 
                     placeholder="First name" value={this.state.first_name} onChange={this.handleFirstNameChange}/> </td>
					 </tbody>
			</table>  
					 <table>
			<tbody>
                      <td key={'surname'}><input type="text" className="form-control" 
                     placeholder="Surname" value={this.state.surname}
                     onChange={this.handleSurnameChange} /> </td>
					 </tbody>
			</table>  
					 <table>
			<tbody>
                      <td key={'dob'}><input type="text" className="form-control" 
                     placeholder="DOB" value={this.state.dob} onChange={this.handleDOBChange}/> </td>
					 </tbody>
			</table>  
					 <table>
			<tbody>
                      <td key={'training_from'}><input type="text" className="form-control" 
                     placeholder="Training from" value={this.state.training_from} onChange={this.handleTrainingFromChange}/> </td>
					 </tbody>
			</table>  
					 <table>
						 <input type="fluid button" className="btn btn-primary btn-block" value="Submit"
	onClick={this.handleUpdateProfile} />
			</table>  
		 </div>
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
                      <ul className="listItems">
                          {displayedUsers}
                      </ul>
                    </div>
              ) ;
	}
});

var MuscleGroupSession = React.createClass({
	getInitialState : function() {
		 return {
		  id: this.props.sessionItem.id
		 } ;
	  },
	handleDeleteSessionItem : function(e) {
	  e.preventDefault();
	  this.props.deleteSessionItemHandler(this.props.sessionItem.id);
	}, 
	render: function() {
		var deleteHandler = this.handleDeleteSessionItem;
		var sessionItem = this.props.sessionItem;
		return (
		
		<li>
		<div className="left-within-main">
			<table className="table table-borderless">
				<tbody>
				  <tr>
					  <td className="col-md-3"><a href={"/sessions/" + sessionItem.id}>{sessionItem.name} </a></td>
				<td className="col-md-6"><input type="button"  className="btn btn-warning" value="delete" onClick={deleteHandler}/></td>
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
var ExerciseUnitToAdd = React.createClass({
	getInitialState : function() {
		 return {
		  status : '',
		  muscle_group: this.props.muscleGroup,
		  name: this.props.exerciseUnitToAdd.name
		 } ;
	},
    handleAddExerciseUnit: function(e) {
		  e.preventDefault();
		  this.props.addExerciseUnitHandler(this.state.name, this.state.muscle_group);
	}, 
	render: function() {
		var addHandler = this.handleAddExerciseUnit;
		//console.log(this.state.name);
		return (
		<tr >
		  <td>
			 <input type="button" className='btn btn-primary'
				   value={this.state.name} onClick={addHandler} />
		  </td>
		</tr>
		);
	}
});

var MuscleGroupSessionList = React.createClass({
	render: function() {
		var displayedSessions = this.props.msessions.map((session) =>{
			return <MuscleGroupSession key={session.id} sessionItem={session} deleteSessionItemHandler={this.props.deleteSessionItemHandler} />;
		}) ;
		return (
		<div className="main-content-without-search-box">
			<div className="main-content">
			  <ul className="listItems">
				  {displayedSessions}
				  
			  </ul>
			  
			</div>
			<AddMuscleGroupSessionForm msessions={this.props.msessions} addMuscleGroupSessionHandler={this.props.addMuscleGroupSessionHandler}/>
			</div>
			
	  ) ;
	}
});

var AddExerciseUnitForm = React.createClass({
	
	render: function() {
		var muscleGroup = this.props.exerciseUnitMuscleGroup;
		var exercisesAdded = _.pluck(this.props.exerciseUnits, 'name');
		//console.log(exercisesAdded);		
		//console.log(muscleGroup);
		var allExercisesAvailable = this.props.exercises;
		//console.log(allExercisesAvailable);
		var muscleGroupExercisesAvailable = [];
		if (exercisesAdded.length == 0) {
			for(var i = 0; i < allExercisesAvailable.length; i++) {
				if (allExercisesAvailable[i].group == muscleGroup) {
					muscleGroupExercisesAvailable.push(allExercisesAvailable[i]);
				}
			}
		} else {
			for(var i = 0; i < allExercisesAvailable.length; i++) {
				if (allExercisesAvailable[i].group == muscleGroup && exercisesAdded.indexOf(allExercisesAvailable[i].name) == -1) {
					muscleGroupExercisesAvailable.push(allExercisesAvailable[i]);
				}
			}
		}
		//console.log(muscleGroupExercisesAvailable);
		var addExerciseUnitButtons = muscleGroupExercisesAvailable.map(function(exerciseUnitToAdd){
                  return (
                   <ExerciseUnitToAdd key={exerciseUnitToAdd.name}  exerciseUnitToAdd={exerciseUnitToAdd} 
                     addExerciseUnitHandler= {this.props.addExerciseUnitHandler} muscleGroup={this.muscleGroup}/>
                    ) ;
                }.bind(this) );
              return (
                  <div className="left-within-main" >
                      {addExerciseUnitButtons}
                  </div>
                ) ;
	}
});

var AddExerciseForm = React.createClass({
    getInitialState: function() {
        return { 
			name: '',
			group: ''
		};
    },
	handleNameChange: function(e) {
	   this.setState({name: e.target.value});
    },
	handleGroupChange: function(e) {
	   this.setState({group: e.target.value});
    },
	handleSubmit: function(e) {
		e.preventDefault();
		console.log(this.props.muscles);
		var muscles = _.pluck(this.props.muscles, 'name');
		var exercises = _.pluck(this.props.exercises, 'name');
		var name = this.state.name;
		var group = this.state.group;
		console.log(muscles);
		console.log(exercises);
		console.log(name);
		console.log(group);
		if (!name || !group || muscles.indexOf(group) == -1 || exercises.indexOf(name) != -1) {
			this.setState({name: ''});
			this.setState({group: ''});
            return;
        }
        this.props.addExerciseHandler(name, group);
        this.setState({name: '', group: ''});
	},
	render: function() {
		return (
		
			<div className="left-within-main">
				<table className="table table-borderless">
				<tbody>
				  <tr>
					  
				<td className="col-md-4"><input type="text" className="form-control"
                     placeholder="Exercise name"
                     value={this.state.name}
                     onChange={this.handleNameChange} /></td>
				<td className="col-md-4"> <input type="text" className="form-control"
                     placeholder="Exercise group"
                     value={this.state.group}
                     onChange={this.handleGroupChange} /></td>
				<td className="col-md-3"><input type="button" className="btn btn-primary" value="Add muscle"
							   onClick={this.handleSubmit} /> </td>
							   <td className="col-md-1"></td>
				
				  </tr>
				</tbody>
			  </table>
			
			</div>
		) ;
	}
});

var Muscle = React.createClass({
	getInitialState : function() {
		 return {
			 status: '',
		  name: this.props.muscle.name,
		  initName: this.props.muscle.name
		} ;
	  },
	handleNameChange: function(e) {
	   this.setState({name: e.target.value});
	},
	handleDelete: function(e) {
		e.preventDefault();
		var muscleConstants = _.pluck(this.props.muscleConstants, 'name');
		var name = this.state.name;
		//console.log(muscleConstants);
		//console.log(muscleConstants.indexOf(name));
		//console.log(name);
		if (muscleConstants.indexOf(name) == -1) {
	       this.props.deleteMuscleHandler(this.state.name);
		};
	},
	handleEdit: function(e) {
		this.setState({ status : 'edit'} )
	},
	handleUpdate: function(e) {
	   e.preventDefault();
	   var name = this.state.name;
	   console.log(this.state.initName);
	   var muscleConstants = _.pluck(this.props.muscleConstants, 'name');
	   console.log(muscleConstants.indexOf(this.state.initName));
	   if ((muscleConstants.indexOf(this.state.initName)) === -1) {
	       this.props.updateMuscleNameHandler(this.state.name);
	   } else {
		   this.setState({ name : this.state.initName});
	   }
	   this.setState({ status : ''} )
	},
	render: function() {
		var updateHandler = this.handleUpdate;
		var editHandler = this.handleEdit;
		var deleteHandler = this.handleDelete;
		var itemsToRender;
		if(this.state.status == '') {
			itemsToRender = [
			<table className="table table-borderless">
				<tbody>
				  <tr>
					<td key={'name'} className="col-md-6"><a href={"/sessions/" + this.state.name}>{this.state.name} </a></td>
					<td className="col-md-2"><input type="button"  className="btn btn-primary btn-block" value="edit" onClick={editHandler}/></td>
					<td className="col-md-2"><input type="button"  className="btn btn-warning btn-block" value="delete" onClick={deleteHandler}/></td>
					<td className="col-md-2"></td>
				  </tr>
				</tbody>
			</table>
			];
		} else {
			itemsToRender = [
			<table className="table table-borderless">
				<tbody className="center">
				  <tr>
					<td key={'name'} className="col-md-4"><input type="text" className="form-control"  value={this.state.name} onChange={this.handleNameChange}/></td>
					<td className="col-md-2"></td>
					<td className="col-md-2"><input type="button" className="btn btn-success btn-block" value="confirm" onClick={updateHandler}/></td>
					<td className="col-md-2"></td>
				  </tr>
				</tbody>
			</table>
			];
		};
		return (
			 <li className="left-within-main">
				{itemsToRender}
			 </li>
		);
	}
});


var MuscleList = React.createClass({
	render: function() {
		var displayedMuscles = this.props.muscles.map((muscle) =>{
			return <Muscle key={muscle.name} muscle={muscle} muscleConstants={this.props.muscleConstants} 
			updateMuscleNameHandler={this.props.updateMuscleNameHandler} deleteMuscleHandler={this.props.deleteMuscleHandler}/>;
		}) ;
		return (
			<div className="main-content-without-search-box">
			  <ul className="listItems">
				  {displayedMuscles}
			  </ul>
			  <AddMuscleForm addMuscleHandler={this.props.addMuscleHandler} muscles={this.props.muscles}/>
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
			<div className="main-content-without-search-box">
				<div className="main-content">
				  <ul className="listItems">
					  {Exercises}
				  </ul>
				  <AddExerciseForm exercises={this.props.exercises} muscles={this.props.muscles} 
				  addExerciseHandler={this.props.addExerciseHandler}/>
				</div>
			</div>
            );
	}
});

var ExerciseUnit = React.createClass({
	getInitialState : function() {
		 return {
			 status: '',
		  name: this.props.exerciseUnit.name,
		  weight: this.props.exerciseUnit.weight,
		  number_of_series: this.props.exerciseUnit.number_of_series,
		  number_of_reps: this.props.exerciseUnit.number_of_reps
		 } ;
	  },
	handleDeleteExerciseUnit: function(e) {
	  e.preventDefault();
	  this.props.deleteExerciseUnitHandler(this.state.name);
	}, 
	handleWeightChange: function(e) {
	  this.setState({weight: e.target.value});
	},
	handleNoOfSeriesChange: function(e) {
	  this.setState({number_of_series: e.target.value});
	},
	handleNoOfRepsChange: function(e) {
	  this.setState({number_of_reps: e.target.value});
	},
	handleUpdate: function(e) {
	  e.preventDefault();
	  console.log(this.state.weight);
	  var weight = this.state.weight;
	  var number_of_series = this.state.number_of_series;
	  var number_of_reps = this.state.number_of_reps;
	  this.props.updateExerciseUnitHandler(this.state.name, weight, number_of_series, number_of_reps);
	  this.setState({ status : ''} )
	},
	handleEdit: function(e) {
		this.setState({ status : 'edit'} )
	},
	render: function() {
		var deleteHandler = this.handleDeleteExerciseUnit;
		var editHandler = this.handleEdit;
		var updateHandler = this.handleUpdate;
		var exerciseUnit = this.props.exerciseUnit;
		var itemsToRender;
		if(this.state.status == '') {
			itemsToRender = [
			<tbody>
			  <tr>
				<td className="col-md-6"><a  href={"/sessions/" + exerciseUnit.name}>{exerciseUnit.name} </a></td>
				<td className="col-md-2"><input type="button"  className="btn btn-warning btn-block" value="edit" onClick={editHandler}/></td>
				<td className="col-md-2">
					<input type="button"  className="btn btn-danger btn-block" value="delete" onClick={deleteHandler}/></td>
				<td className="col-md-2"></td>
			  </tr>
			  </tbody>
			];
		} else {
			itemsToRender = [
			<tbody className="center">
			  <tr>
				<td  key={'weight'} className="col-md-2">kg</td>
				<td key={'number_of_series'}className="col-md-2">no of series</td>
				<td key={'number_of_reps'} className="col-md-2">no of reps</td>
			  </tr>
			  <tr>
				<td key={'weight'} className="col-md-2"><input type="text" className="form-control"  value={this.state.weight} onChange={this.handleWeightChange}/></td>
				<td key={'number_of_series'} className="col-md-2"><input type="text" className="form-control"  value={this.state.number_of_series} onChange={this.handleNoOfSeriesChange}/></td>
				<td key={'number_of_reps'} className="col-md-2"><input type="text" className="form-control"  value={this.state.number_of_reps} onChange={this.handleNoOfRepsChange}/></td>
				
				<td className="col-md-5"><input type="button"  className="btn btn-success btn-block" value="confirm" onClick={updateHandler}/></td>
			  </tr>
			</tbody>
			];
		};
		return (
			 <li className="left-within-main">
				 <table className="table table-borderless">
					
						{itemsToRender}
					
				 </table>
			 </li>
		)
	}
});


var ExerciseUnitList = React.createClass({
	render: function() {
		var displayedExercises = this.props.exerciseUnits.map((exercise) =>{
			return <ExerciseUnit key={exercise.name} exerciseUnit={exercise} deleteExerciseUnitHandler={this.props.deleteExerciseUnitHandler}
			updateExerciseUnitHandler={this.props.updateExerciseUnitHandler}/>;
		}) ;
            return (
			<div className="main-content-without-search-box">
                    <div className="main-content">
                      <ul className="listItems">
                          {displayedExercises}
                      </ul>
                    </div>
					<AddExerciseUnitForm exerciseUnitMuscleGroup={this.props.exerciseUnitMuscleGroup} exerciseUnits={this.props.exerciseUnits} exercises={this.props.exercises}
					addExerciseUnitHandler= {this.props.addExerciseUnitHandler}/>
					</div>
              ) ;
	}
});

var TrainingSession = React.createClass({
	render: function() {
		var trainingSessionItem = this.props.trainingSessionItem;
		return (
		<li className="listItems">
			<a  href={"/tsessions/" + trainingSessionItem.date}>{trainingSessionItem.date}</a>
		</li>
		)
	}
});

var TrainingSessionsList = React.createClass({
	render: function() {
		var user = this.props.users[0];
		var displayedTsessions = user.training_sessions.map((tsession) =>{
			return <TrainingSession key={tsession.id} trainingSessionItem={tsession} />;
		}) ;
            return (
				<div className="main-content-without-search-box">
				  <ul className="listItems">
					  {displayedTsessions}
				  </ul>
				</div>
		  ) ;	
	}
});

var AddMuscleGroupSessionForm = React.createClass({
	getInitialState : function() {
		
	   return {
		status : '',
		name: ''
	   } ;
	},
	handleMuscleNameChange: function(e) {
        this.setState({name: e.target.value});
    },
	
	handleAddMuscle: function(e) {
		e.preventDefault();
		
		var name = this.state.name.trim();
		var muscles = api.getAllMuscles();
		var muscleNames = _.pluck(muscles, 'name');
		var musclesInSession = _.pluck(this.props.msessions, 'name');
		console.log(musclesInSession);
		console.log(muscleNames);
		console.log(name);
		
		if (muscleNames.indexOf(name) !== -1 && musclesInSession.indexOf(name) === -1) {
			this.props.addMuscleGroupSessionHandler(name);
		} else {
			this.setState({name: ''})
		}
	},
	render: function() {
            return (
			<div className="calendar">
				<div className="left-within-main">
				<table className="table table-borderless">
				<tbody>
				  <tr>
					  
				<td key={'name'} className="col-md-6"><input type="text" className="form-control" 
				placeholder="Type muscle group" onChange={this.handleMuscleNameChange}/></td>
				<td className="col-md-3"><input type="button" className="btn btn-primary" value="Add muscle group"
							   onClick={this.handleAddMuscle} /> </td>
							   <td className="col-md-1"></td>
				<td className="col-md-2"> </td>
				  </tr>
				</tbody>
			  </table>
				
				</div>
				</div>
		  ) ;
	}
});

var AddMuscleForm = React.createClass({
	getInitialState: function() {
        return { 
			name: ''
		};
    },
	handleNameChange: function(e) {
	   this.setState({name: e.target.value});
    },
	handleSubmit: function(e) {
		var muscles = _.pluck(this.props.muscles, 'name');
		e.preventDefault();
		var name = this.state.name;
		if (!name || muscles.indexOf(name) != -1) {
			this.setState({name: ''});
            return;
        }
        this.props.addMuscleHandler(name);
        this.setState({name: ''});
	},
	render: function() {
		return (
		
			<div className="left-within-main">
				<table className="table table-borderless">
				<tbody>
				  <tr>
					  
				<td className="col-md-4"><input type="text" className="form-control"
                     placeholder="Add new muscle"
                     value={this.state.name}
                     onChange={this.handleNameChange} /></td>
				<td className="col-md-3"><input type="button" className="btn btn-primary" value="Add muscle"
							   onClick={this.handleSubmit} /> </td>
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
		
		{/*<UserInfo />*/}
		{/*<FilteredUsersList  users={this.props.users}/>*/}
		
		
			{/*<ExerciseUnitList exerciseUnits={this.props.exerciseUnits}/>*/}
		{/**/}
		{/**/}
		{/**/}
		{/*<ExerciseInfo/>*/}
		<div className="calendar">
		
		{/*<AddMuscleGroupSessionForm/>*/}
		{/**/}
		{/**/}
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
	  addNewExercise: function(name, group) {
		api.addExercise(name, group);
		this.setState({});
	  },
	  deleteExercise: function(key) {
		  api.deleteExercise(key);
		  this.setState( {} ) ;
	  },
	  updateExercise: function(name, group) {
		 api.updateExercise(name, group);
		 this.setState( {} ) ;
	  },
	  addNewMuscle: function(key) {
		api.addMuscle(key);
		this.setState({});
	  },
	  deleteMuscle: function(key) {
		  api.deleteMuscle(key);
		  this.setState( {} ) ;
	  },
	  updateMuscleName: function(name) {
		 api.updateMuscleName(name);
		 this.setState( {} ) ;
	  },
	  updateExerciseUnit: function(name, weight, number_of_series, number_of_reps) {
		  api.updateExerciseUnit(name, weight, number_of_series, number_of_reps); 
		this.setState( {} ) ;
	  },
	  addExerciseUnit: function(name, muscle_group) {
		  api.addExerciseUnit(name, muscle_group) ;
             this.setState({});
	  },
	  deleteExerciseUnit: function(key) {
		  api.deleteExerciseUnit(key);
		  this.setState( {} ) ;
	  },
	  deleteSession: function(sessionId) {
		api.deleteSession(sessionId);  
		this.setState( {} ) ;
	  },
	  updateProfile: function(key,f,s,d,t) {
		api.updateUser(key,f,s,d,t); 
		this.setState( {} ) ;
	  },
	  handleChange : function(type,value) {
        if ( type == 'search' ) {
            this.setState( { search: value } ) ;
          } else {
             this.setState( { sort: value } ) ;
          }
      }, 
	  addMuscleGroupSession(name) {
		  api.addMuscleGroupSession(name) ;
             this.setState({});
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
	   var muscleConstants = api.getAllMuscleConstants();
	   var exerciseConstants = api.getAllExerciseConstants();
	   var testUser = users[0];
	   var userList = users.filter(function(p) {
		   var name = p.first_name + ' ' + p.surname;
                  return name.toLowerCase().search(
                      this.state.search.toLowerCase() ) != -1 ;
                    }.bind(this) );
            var filteredList = _.sortBy(userList, this.state.sort) ;
	 
	  var exercises = api.getAllExercises();
	  var muscles = api.getAllMuscles();
	  var exerciseUnits = api.getAllExerciseUnits();
	  var exerciseUnitMuscleGroup = "back"; ///parameterise later!!!!!!
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
			{/*<ExerciseNamePick exercises={exercises} generateChartHandler={this.generateChartData}/>*/}
			{/*<MuscleGroupSessionList  msessions={muscleSessions} deleteSessionItemHandler={this.deleteSession} addMuscleGroupSessionHandler={this.addMuscleGroupSession}/>*/}
			{/*<ExerciseUnitList exerciseUnits={exerciseUnits} exercises={exercises} deleteExerciseUnitHandler={this.deleteExerciseUnit} 
			addExerciseUnitHandler={this.addExerciseUnit} exerciseUnitMuscleGroup={exerciseUnitMuscleGroup} 
			updateExerciseUnitHandler={this.updateExerciseUnit}/>*/}
			
        <MainContent users={filteredList}  exerciseUnits={exerciseUnits} 
		muscles={muscles} exercises={exercises}/>
		{/*<Chart data={this.state.data}/>*/}
			{/*<EditProfileForm key={testUser.id} user={testUser} profileUpdateHandler={this.updateProfile}/>*/}
				{/*<TrainingSessionsList users={users} />*/}
		{/*<MuscleList muscles={muscles} muscleConstants={muscleConstants} updateMuscleNameHandler={this.updateMuscleName} 
		deleteMuscleHandler={this.deleteMuscle} addMuscleHandler={this.addNewMuscle}/>*/}
		<ExerciseList exercises={exercises} exerciseConstants={exerciseConstants} updateExerciseHandler={this.updateExercise} 
		deleteExerciseHandler={this.deleteExercise} addExerciseHandler={this.addNewExercise} muscles={muscles}/>
		  <Footer />
		  </div>
	  );
  }
});

export default GymProgressLogger;
