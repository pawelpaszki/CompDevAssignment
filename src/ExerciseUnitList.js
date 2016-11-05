import React from 'react';
import './App.css';
import api from './test/stubAPI';



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

export default ExerciseUnitList;