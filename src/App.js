import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

import './App.css';
//const low = require('lowdb');
import api from './test/stubAPI';
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';
import FilteredUsersList from './FilteredUsersList';
import UserInfo from './UserInfo';
import SelectableDay from './SelectableDay';
import Chart from './Chart';
import ExerciseNamePick from './ExerciseNamePick';
import EditProfileForm from './EditProfileForm';
import TrainingSessionsList from './TrainingSessionsList';




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

var ExerciseInfo = React.createClass({
	render: function() {
		return (
		<div className="main-content-without-search-box">
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
		//console.log(this.props.muscles);
		var muscles = _.pluck(this.props.muscles, 'name');
		var exercises = _.pluck(this.props.exercises, 'name');
		var name = this.state.name;
		var group = this.state.group;
		//console.log(muscles);
		//console.log(exercises);
		//console.log(name);
		//console.log(group);
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
				<td className="col-md-3"><input type="button" className="btn btn-primary" value="Add exercise"
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
	getInitialState : function() {
		 return {
			 status: '',
		  name: this.props.exercise.name,
		  group: this.props.exercise.group,
		  initName: this.props.exercise.name,
		  initGroup: this.props.exercise.group,
		} ;
	  },
	handleNameChange: function(e) {
	   this.setState({name: e.target.value});
	},
	handleGroupChange: function(e) {
	   this.setState({group: e.target.value});
	},
	handleDelete: function(e) {
		e.preventDefault();
		var exerciseConstants = _.pluck(this.props.exerciseConstants, 'name');
		var name = this.state.name;
		var group = this.state.group;
		//console.log(muscleConstants);
		//console.log(muscleConstants.indexOf(name));
		//console.log(name);
		if (exerciseConstants.indexOf(name) == -1) {
	       this.props.deleteExerciseHandler(name, group);
		};
	},
	handleEdit: function(e) {
		this.setState({ status : 'edit'} )
	},
	handleUpdate: function(e) {
	   e.preventDefault();
	   var name = this.state.name;
	   var group = this.state.group;
	   var muscles = _.pluck(this.props.muscles, 'name');
	   console.log(this.state.initName);
	   var exerciseConstants = _.pluck(this.props.exerciseConstants, 'name');
	   console.log(exerciseConstants.indexOf(this.state.initName));
	   if ((exerciseConstants.indexOf(this.state.initName)) === -1 && (muscles.indexOf(group)) !== -1) {
	       this.props.updateExerciseHandler(name, group);
	   } else {
		   this.setState({ name : this.state.initName});
		   this.setState({ group : this.state.initGroup});
	   }
	   this.setState({ status : ''} )
	},
	render:function(){
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
					<td key={'group'} className="col-md-4"><input type="text" className="form-control"  value={this.state.group} onChange={this.handleGroupChange}/></td>
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
			 )
	}
});


var ExerciseList = React.createClass({
	render: function() {
		var Exercises = this.props.exercises.map((exercise) =>{
			return <Exercise key={exercise.name} exercise={exercise} deleteExerciseHandler={this.props.deleteExerciseHandler}
			updateExerciseHandler={this.props.updateExerciseHandler} exerciseConstants={this.props.exerciseConstants} muscles={this.props.muscles} />;
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

var GymProgressLogger = React.createClass({
	getInitialState: function() {
	    return { 
		 search: '', 
		 sort: 'dob',
		 data: [{text: '0', value: 0}]
		};
      },
	  addTrainingSession: function(date) {
		api.addTrainingSession(date);
		this.setState({});
	  },
	  updateTrainingSession: function(key, date) {
		 api.updateTrainingSession(key, date);
		 this.setState({});
	  },
	  deleteTrainingSession: function(key) {
		  api.deleteTrainingSession(key);
		  this.setState({});
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
	  var trainingSessions = api.getAllTrainingSessions();
	  return (
	  <div>
	  
		<Navbar />
        <Sidebar/>
		{/*<FilteredUsersList users={userList}/>*/}
		
		{/*<ExerciseInfo/>*/}
		{/*<UserInfo />*/}
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

		{/*<Chart data={this.state.data}/>*/}
			{/*<EditProfileForm key={testUser.id} user={testUser} profileUpdateHandler={this.updateProfile}/>*/}
				<TrainingSessionsList trainingSessions={trainingSessions} deleteTrainingSessionHandler={this.deleteTrainingSession}
				updateTrainingSessionHandler={this.updateTrainingSession} addTrainingSessionHandler={this.addTrainingSession}/>
		{/*<MuscleList muscles={muscles} muscleConstants={muscleConstants} updateMuscleNameHandler={this.updateMuscleName} 
		deleteMuscleHandler={this.deleteMuscle} addMuscleHandler={this.addNewMuscle}/>*/}
		{/*<ExerciseList exercises={exercises} exerciseConstants={exerciseConstants} updateExerciseHandler={this.updateExercise} 
		deleteExerciseHandler={this.deleteExercise} addExerciseHandler={this.addNewExercise} muscles={muscles}/>*/}
		  <Footer />
		  </div>
	  );
  }
});

export default GymProgressLogger;
