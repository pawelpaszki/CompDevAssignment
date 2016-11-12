import React from 'react';
import './App.css';
import { Link } from 'react-router';
import $ from "jquery";
import {Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';


var ExerciseUnit = React.createClass({
	getInitialState : function() {
		 return {
			 status: '',
			 id: this.props.exerciseUnit.id,
		  name: this.props.exerciseUnit.name,
		  weight: this.props.exerciseUnit.weight,
		  number_of_series: this.props.exerciseUnit.number_of_series,
		  number_of_reps: this.props.exerciseUnit.number_of_reps
		 } ;
	  },
	handleDeleteExerciseUnit: function(e) {
	  e.preventDefault();
	  this.props.deleteExerciseUnitHandler(this.state.id);
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
	  var weight = this.state.weight;
	  var number_of_series = this.state.number_of_series;
	  var number_of_reps = this.state.number_of_reps;
	  console.log("update");
		this.props.updateExerciseUnitHandler(this.state.id, this.state.name, weight, number_of_series, number_of_reps);
	  this.setState({ status : ''});
	},
	handleEdit: function(e) {
		this.setState({ status : 'edit'} );
	},
	handleUndo: function(e) {
		this.setState({ status : ''} );
	},
	render: function() {
		var deleteHandler = this.handleDeleteExerciseUnit;
		var editHandler = this.handleEdit;
		var exerciseUnit = this.props.exerciseUnit;
		var itemsToRender;
		if(this.state.status == '') {
			itemsToRender = [
			<tbody>
			  <tr>
			    <td className="col-md-1"></td>
				<td className="col-md-3">{exerciseUnit.name} </td>
				<td className="col-md-1"><input type="button"  className="btn btn-warning btn-block" value="edit" onClick={editHandler}/></td>
				<td className="col-md-1">
					<input type="button"  className="btn btn-danger btn-block" value="delete" onClick={deleteHandler}/></td>
				<td className="col-md-7"></td>
			  </tr>
			  </tbody>
			];
		} else {
			itemsToRender = [
			<tbody>
			  <tr>
			    <td className="col-md-1"></td>
			    <td className="col-md-3">{exerciseUnit.name}</td>
				<td key={'weight'} className="col-md-1">kg</td>
				<td key={'number_of_series'}className="col-md-2">no of series</td>
				<td key={'number_of_reps'} className="col-md-2">no of reps</td>
				<td className="col-md-1"></td>
				<td className="col-md-2"></td>
				
			  </tr>
			  <tr>
			    <td className="col-md-1"></td>
				<td className="col-md-3"></td>
				<td key={'weight'} className="col-md-2"><input type="text" className="form-control"  value={this.state.weight} onChange={this.handleWeightChange}/></td>
				<td key={'number_of_series'} className="col-md-1"><input type="text" className="form-control"  value={this.state.number_of_series} onChange={this.handleNoOfSeriesChange}/></td>
				<td key={'number_of_reps'} className="col-md-1"><input type="text" className="form-control"  value={this.state.number_of_reps} onChange={this.handleNoOfRepsChange}/></td>
				<td className="col-md-1"><input type="button"  className="btn btn-primary btn-block" value="undo" onClick={this.handleUndo}/></td>
				<td className="col-md-1"><input type="button"  className="btn btn-success btn-block" value="confirm" onClick={this.handleUpdate}/></td>
				<td className="col-md-1"></td>
			  </tr>
			</tbody>
			];
		};
		return (
			 <li className="list-group">
				 <table className="table table-borderless">
						{itemsToRender}
				 </table>
			 </li>
		)
	}
});

var AddExerciseUnitForm = React.createClass({
	
	render: function() {
		var muscleGroup = this.props.muscleGroup;
		var exercisesAdded = [];
		var exercisesAvailable = [];
		if(this.props.exerciseUnits != null) {
		   exercisesAdded = _.pluck(this.props.exerciseUnits, 'name');
		} else {
			exercisesAvailable = this.props.exercisesAvailable;
		}
		console.log("exercises added: " + exercisesAdded);	
		var allExercisesAvailable = this.props.exercises;
		
		for(var i=0; i < allExercisesAvailable.length; i++) {
			if(allExercisesAvailable[i].group == muscleGroup) {
				exercisesAvailable.push(allExercisesAvailable[i].name);
			}
		};
		console.log("exercises available: " + exercisesAvailable);
		var muscleGroupExercisesAvailable = [];
		if (exercisesAdded.length == 0) {
				muscleGroupExercisesAvailable = exercisesAvailable;
		} else {
			for(var i = 0; i < allExercisesAvailable.length; i++) {
				if (allExercisesAvailable[i].group == muscleGroup && exercisesAdded.indexOf(allExercisesAvailable[i].name) == -1) {
					muscleGroupExercisesAvailable.push(allExercisesAvailable[i]);
				}
			}
		};
		console.log(muscleGroupExercisesAvailable);
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

var ExerciseUnitToAdd = React.createClass({
	getInitialState : function() {
		 return {
		  status : '',
		  name: this.props.exerciseUnitToAdd.name
		 } ;
	},
    handleAddExerciseUnit: function(e) {
		  e.preventDefault(this.state.name);
		  console.log()
		  this.props.addExerciseUnitHandler(this.state.name);
	}, 
	render: function() {
		var addHandler = this.handleAddExerciseUnit;
		//console.log(this.state.name);
		return (
			 <input type="button" className='btn btn-primary'
				   value={this.state.name} onClick={addHandler} />
		);
	}
});

var ExerciseUnitList = React.createClass({
	getInitialState: function() {
	    return {
		 allExerciseUnits: [],
		 allExercises : [],
		 muscleGroup: '',
		 muscleGroupSessionId: this.props.params.id
		};
      },
	  componentDidMount(){
		this.getMuscleGroupSession('http://localhost:3001/musclegroupsessions/' + this.props.params.id);
        this.getAllExerciseUnitsFromServer('http://localhost:3001/exerciseunits/');
		this.getAllExercises('http://localhost:3001/exercises/');
      },
	  populateExercises: function(response) {
		this.setState({
			allExercises: response
		});
	 },
	 getAllExercises:function(URL){
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
      },
	  populateExerciseUnits: function(response) {
		this.setState({
			allExerciseUnits: response
		});
	 },
	 getAllExerciseUnitsFromServer:function(URL){
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
      },
	  setMuscleGroup: function(response) {
		this.setState({
			muscleGroup: response
		});
	 },
	 getMuscleGroupSession:function(URL){
        $.ajax({
            type:"GET",
            dataType:"json",
            url:URL,
            success: function(response) {
                this.setMuscleGroup(response);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
      },
	  updateExerciseUnit: function(id, name, weight, number_of_series, number_of_reps) {
		  console.log("updateee");
		    $.ajax({
			url: 'http://localhost:3001/exerciseunits/' + id,
			type: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify({
				muscle_group: this.state.muscleGroup.name,
				muscle_group_session_id: this.state.muscleGroupSessionId,
				id: id,
				name: name,
				weight, weight,
				number_of_series: number_of_series,
				number_of_reps: number_of_reps,
			}),
			dataType: 'json'
		});
		document.location.reload(true);
	  },
	  deleteExerciseUnit:function(id) {
		  $.ajax({
			url: 'http://localhost:3001/exerciseunits/' + id,
			type: 'DELETE',
			contentType: 'application/json'
			});
			document.location.reload(true);
	  },
	  addExerciseUnit:function(name) {
		  var maxId= 0;
		  var exerciseUnits = this.state.allExerciseUnits;
		  for (var i = 0; i < exerciseUnits.length; i++) {
			  if(exerciseUnits[i].id > maxId) {
				  maxId = exerciseUnits[i].id;
			  }
		  };
		  console.log("name" + name);
		  var id = maxId + 1;
		  console.log("id: " + id);
		  console.log("muscle session id: " + this.state.muscleGroupSessionId);
		    $.ajax({
			url: 'http://localhost:3001/exerciseunits',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				muscle_group: this.state.muscleGroup,
				muscle_group_session_id: this.state.muscleGroupSessionId,
				id: id,
				name: name,
				weight: 0,
				number_of_series: 0,
				number_of_reps: 0,
			}),
			dataType: 'json'
		});
		this.setState({});
		document.location.reload(true);
	  },
	render: function() {
		var allExerciseUnits = this.state.allExerciseUnits;
		var muscleGroup = this.state.muscleGroup.name;
		var exerciseUnits = [];
		var exercises = this.state.allExercises;
		for(var i = 0; i < this.state.allExerciseUnits.length; i++) {
			if(allExerciseUnits[i].muscle_group_session_id == this.state.muscleGroupSessionId) {
				exerciseUnits.push(allExerciseUnits[i]);
			}
		};
		var availableExercises = [];
		for(i = 0; i < exercises.length; i++) {
			if(exercises[i].group == muscleGroup) {
				availableExercises.push(exercises[i].name);
			}
		}
		console.log("units");
		console.log(exerciseUnits);
		var displayedExercises = exerciseUnits.map((exercise) =>{
			return <ExerciseUnit key={exercise.id} exerciseUnit={exercise} deleteExerciseUnitHandler={this.deleteExerciseUnit}
			updateExerciseUnitHandler={this.updateExerciseUnit}/>;
		}) ;
		return (
		<div>
			<Link to="/home" ><button style={{marginRight: 1 + 'em', marginTop: 1 + 'em', paddingLeft: 10 + 'px', paddingRight: 6 + 'px'}} className="nav btn-primary navbar-nav navbar-right">Home</button></Link>
			<Link to="/muscles" ><button style={{marginRight: 1 + 'em',  marginTop: 1 + 'em', paddingLeft: 10 + 'px', paddingRight: 6 + 'px'}} className="nav btn-primary navbar-nav navbar-right">Muscles & Exercises</button></Link>
			<h3> {muscleGroup}'s exercises</h3>
			<Button style={{marginLeft: 2 + 'em', marginTop: 1 + 'em', marginBottom: 1 + 'em', paddingLeft: 1 + 'em'}} className="btn primary-btn"onClick={browserHistory.goBack}>Go back</Button>
		    <ul className="list-group">
			  {displayedExercises}
			</ul>
			<AddExerciseUnitForm muscleGroup={muscleGroup} exerciseUnits={exerciseUnits} exercises={exercises}
			addExerciseUnitHandler= {this.addExerciseUnit} availableExercises={availableExercises}/>
		</div>
		  );
	}
});

export default ExerciseUnitList;