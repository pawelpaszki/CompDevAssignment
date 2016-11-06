import React from 'react';
import './App.css';
import { Link } from 'react-router';
import $ from "jquery";
import _ from 'lodash';

var Exercise = React.createClass({
	getInitialState : function() {
		 return {
			 status: '',
			 id: this.props.exercise.id,
		  name: this.props.exercise.name,
		  group: this.props.exercise.group,
		  initName: this.props.exercise.name,
		} ;
	  },
	handleNameChange: function(e) {
	   this.setState({name: e.target.value});
	},
	handleDelete: function(e) {
		e.preventDefault();
		var exerciseConstants = _.pluck(this.props.exerciseConstants, 'name');
		var name = this.state.name;
		var group = this.state.group;
		console.log(exerciseConstants);
		console.log(exerciseConstants.indexOf(name));
		console.log(name);
		if (exerciseConstants.indexOf(name) == -1) {
	       this.props.deleteExerciseHandler(this.state.id);
		} else {
		   this.setState({status: ''})	;
		};
	},
	handleEdit: function(e) {
		this.setState({ status : 'edit'} )
	},
	handleUndo: function(e) {
		this.setState({ status : ''} )
	},
	handleUpdate: function(e) {
	   e.preventDefault();
	   var name = this.state.name;
	   var group = this.state.group;
	   var muscles = _.pluck(this.props.muscles, 'name');
	   console.log(this.state.initName);
	   var exerciseConstants = _.pluck(this.props.exerciseConstants, 'name');
	   console.log(exerciseConstants.indexOf(this.state.initName));
	   if ((exerciseConstants.indexOf(this.state.initName)) == -1) {
	       this.props.updateExerciseHandler(this.state.id, name);
		   this.setState({ name : this.state.name});
		   console.log(this.state.name);
	   } else {
		   this.setState({ name : this.state.initName});
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
					<td key={'id'} className="col-md-6"><a href={"/sessions/" + this.state.name}>{this.state.name} </a></td>
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
					<td key={'id'} className="col-md-4"><input type="text" className="form-control"  value={this.state.name} onChange={this.handleNameChange}/></td>
					<td className="col-md-2"></td>
					<td className="col-md-2"><input type="button" className="btn btn-primary btn-block" value="undo" onClick={this.handleUndo}/></td>
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

var AddExerciseForm = React.createClass({
    getInitialState: function() {
        return { 
			name: '',
			group: this.props.muscleGroup,
		};
    },
	handleNameChange: function(e) {
	   this.setState({name: e.target.value});
    },
	handleSubmit: function(e) {
		e.preventDefault();
		console.log(this.props.muscles);
		var muscles = _.pluck(this.props.muscles, 'name');
		var exercises = _.pluck(this.props.exercises, 'name');
		var name = this.state.name;
		var group = this.props.muscleGroup;
		console.log(group);
		console.log(muscles);
		console.log(exercises);
		console.log(name);
		if (!name || !group || exercises.indexOf(name) != -1) {
			this.setState({name: ''});
            return;
        }
        this.props.addExerciseHandler(name, group);
        this.setState({name: ''});
	},
	render: function() {
		return (
		
			<div className="left-within-main">
				<table className="table table-borderless">
				<tbody>
				  <tr>
					  
				<td key={'name'} className="col-md-4"><input type="text" className="form-control"
                     placeholder="Exercise name"
                     value={this.state.name}
                     onChange={this.handleNameChange} /></td>
				<td className="col-md-4"> </td>
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

var ExerciseList = React.createClass({
	getInitialState: function() {
	    return {
		 exercises: [],
		 muscles: [],
		 constants: [],
		 muscleId: this.props.params.id,
		 group: '',
		};
      },
	  componentDidMount(){
		this.getAllExercises('http://localhost:3000/exercises/');
		this.getAllMuscles('http://localhost:3000/muscles/');
		this.getAllMuscleConstants('http://localhost:3000/constants/');
      },
	  populateMuscleConstants: function(response) {
		this.setState({
			constants: response
		});
	 },
	 getAllMuscleConstants:function(URL){
        $.ajax({
            type:"GET",
            dataType:"json",
            url:URL,
            success: function(response) {
                this.populateMuscleConstants(response);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
      },
	  populateMuscles: function(response) {
		this.setState({
			muscles: response
		});
		for (var i = 0; i < this.state.muscles.length; i++) {
			if(this.state.muscleId == this.state.muscles[i].id) {
				this.setState({group: this.state.muscles[i].name});
			}
		}
	 },
	 getAllMuscles:function(URL){
        $.ajax({
            type:"GET",
            dataType:"json",
            url:URL,
            success: function(response) {
                this.populateMuscles(response);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
      },
	  populateExercises: function(response) {
		this.setState({
			exercises: response
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
	  deleteExercise:function(id) {
		  $.ajax({
			url: 'http://localhost:3000/exercises/' + id,
			type: 'DELETE',
			contentType: 'application/json'
			});
			document.location.reload(true);
	  },
	  updateExercise: function(id, name) {
		    $.ajax({
			url: 'http://localhost:3000/exercises/' + id,
			type: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify({
				id: id,
				name: name,
				group: this.state.group,
				picture: "assets/exercises/default.jpg"
			}),
			dataType: 'json'
		});
		document.location.reload(true);
	  },
	  addExercise:function(name, group) {
		  var maxId= 0;
		  var allExercises = this.state.exercises;
		  for (var i = 0; i < allExercises.length; i++) {
			  if(allExercises[i].id > maxId) {
				  maxId = allExercises[i].id;
			  }
		  };
		  //console.log("name" + name);
		  var id = maxId + 1;
		  //console.log("id: " + id);
		   
		    $.ajax({
			url: 'http://localhost:3000/exercises',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				id: id,
				name: name,
				group: group,
				picture: "assets/exercises/default.jpg"
			}),
			dataType: 'json'
		});
		this.setState({});
		document.location.reload(true);
	  },
	render: function() {
		console.log(this.state.group);
		var muscleGroup;
		for (var a = 0; a < this.state.muscles.length; a++) {
			if(this.state.muscles[a].id == this.state.muscleId) {
				muscleGroup = this.state.muscles[a].name;
			}
		};
		console.log(muscleGroup);
		var constants = this.state.constants;
		var exerciseConstants = [];
		for(var i = 0; i < constants.length; i++) {
			for(var j = 0; j < constants[i].exercises.length; j++) {
				exerciseConstants.push(constants[i].exercises[j]);
			}
		};
		var exercises = [];
		for (i = 0; i < this.state.exercises.length; i++) {
			if(this.state.exercises[i].group == muscleGroup) {
				exercises.push(this.state.exercises[i]);
			}
		};
		var Exercises = exercises.map((exercise) =>{
			return <Exercise key={exercise.id} exercise={exercise} deleteExerciseHandler={this.deleteExercise}
			updateExerciseHandler={this.updateExercise} exerciseConstants={exerciseConstants} muscles={this.state.muscles} />;
		}) ;
		return (
		<div className="main-content-without-search-box">
			<div className="main-content">
			  <ul className="listItems">
				  {Exercises}
			  </ul>
			  <AddExerciseForm exercises={this.state.exercises} muscles={this.state.muscles} 
			  addExerciseHandler={this.addExercise} muscleGroup={this.state.group}/>
			</div>
		</div>
		);
	}
});

export default ExerciseList;