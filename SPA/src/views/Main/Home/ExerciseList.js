import React from 'react';
import './App.css';
import { Link } from 'react-router';
import $ from "jquery";
import _ from 'lodash';
import {Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Header from './Header';

var Exercise = React.createClass({
	getInitialState : function() {
		return {
		  status: '',
			id: this.props.id,
		  name: this.props.name,
		  muscle_id: this.props.muscle_id
		};
	},
	handleNameChange: function(e) {
	  this.setState({name: e.target.value});
	},
	handleDelete: function(e) {
		e.preventDefault();
    this.props.deleteExerciseHandler(this.state.id);
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
	  this.props.updateExerciseHandler(this.state.id, name);
		this.setState({ name : this.state.name});
	  this.setState({ status : ''})
	},
	render:function(){
		var updateHandler = this.handleUpdate;
		var editHandler = this.handleEdit;
		var deleteHandler = this.handleDelete;
		var itemsToRender;
    var muscle_id = this.state.muscle_id;
    var id = this.state.id;
		if(this.state.status == '') {
			itemsToRender = [
			<table className="table table-borderless">
				<tbody>
				  <tr>
				    <td className="col-md-1"> </td>
					  <td key={'id'} className="col-md-3"><Link to={'/api/muscles/' + muscle_id + '/exercises/' + id + '/exerciseinfo/'}>{this.state.name} </Link> </td>
            <td className="col-md-1"><input type="button"  className="btn btn-primary btn-block" value="edit" onClick={editHandler}/></td>
            <td className="col-md-1"><input type="button"  className="btn btn-warning btn-block" value="delete" onClick={deleteHandler}/></td>
            <td className="col-md-7"></td>
				  </tr>
				</tbody>
			</table>
			];
		} else {
			itemsToRender = [
        <table className="table table-borderless">
          <tbody className="center">
            <tr>
              <td className="col-md-1"></td>
              <td key={'id'} className="col-md-3"><input type="text" className="form-control"  value={this.state.name} onChange={this.handleNameChange}/></td>
              <td className="col-md-1"><input type="button" className="btn btn-primary btn-block" value="undo" onClick={this.handleUndo}/></td>
              <td className="col-md-1"><input type="button" className="btn btn-success btn-block" value="confirm" onClick={updateHandler}/></td>
              <td className="col-md-7"></td>
            </tr>
          </tbody>
        </table>
			];
		};
		return (
			<li className="list-group">
				{itemsToRender}
		  </li>
    )
	}
});

var AddExerciseForm = React.createClass({
  getInitialState: function() {
    return { 
      status: '',
			name: '',
			step1: '',
			step2: '',
			step3: '',
			step4: '',
			step5: '',
			picture1: '',
			picture2: ''
		};
  },
	handleNameChange: function(e) {
	  this.setState({name: e.target.value});
  },
	handleStep1Change: function(e) {
	  this.setState({step1: e.target.value});
  },
	handleStep2Change: function(e) {
	  this.setState({step2: e.target.value});
  },
	handleStep3Change: function(e) {
	  this.setState({step3: e.target.value});
  },
	handleStep4Change: function(e) {
	  this.setState({step4: e.target.value});
  },
	handleStep5Change: function(e) {
	  this.setState({step5: e.target.value});
  },
	handlePicture1Change: function(e) {
	  this.setState({picture1: e.target.value});
  },
	handlePicture2Change: function(e) {
	  this.setState({picture2: e.target.value});
  },
	handleAdd: function() {
		this.setState({status: 'add'})
	},
	handleUndo: function() {
		this.setState({status: ''})
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var name = this.state.name;
		var pictures = [{"start": this.state.picture1, "finish": this.state.picture2}];
		var descriptions = [
      {"id" : 1, "step": this.state.step1}, 
      {"id" : 2, "step": this.state.step2},
      {"id" : 3, "step": this.state.step3},
      {"id" : 4, "step": this.state.step4},
      {"id" : 5, "step": this.state.step5},
    ];
    this.props.addExerciseHandler(name, descriptions, pictures);
    this.setState({name: '', status: ''});
	},
	render: function() {
		var itemsToRender;
		if (this.state.status == 'add') {
			itemsToRender = [
				<tbody>
          <tr>
            <td key={'name'} className="col-md-2"><input type="text" className="form-control"
              placeholder="Exercise name" value={this.state.name} onChange={this.handleNameChange} />
            </td>
            <td key={'step1'} className="col-md-6"><input type="text" className="form-control"
              placeholder="Step 1" value={this.state.step1} onChange={this.handleStep1Change} />
            </td>
					</tr>
				  <tr>
            <td key={'step2'} className="col-md-6"><input type="text" className="form-control"
              placeholder="Step 2" value={this.state.step2} onChange={this.handleStep2Change} />
            </td>
				    <td key={'step3'} className="col-md-6"><input type="text" className="form-control"
              placeholder="Step 3" value={this.state.step3} onChange={this.handleStep3Change} />
            </td>
          </tr>
				  <tr>
				    <td key={'step4'} className="col-md-6"><input type="text" className="form-control"
              placeholder="Step 4" value={this.state.step4} onChange={this.handleStep4Change} />
            </td>
            <td key={'step5'} className="col-md-6"><input type="text" className="form-control"
              placeholder="Step 5" value={this.state.step5} onChange={this.handleStep5Change} />
            </td>
					</tr>
				  <tr>
            <td key={'picture1'} className="col-md-6"><input type="text" className="form-control"
              placeholder="Picture 1 url" value={this.state.picture1} onChange={this.handlePicture1Change} />
            </td>
					  <td key={'picture2'} className="col-md-6"><input type="text" className="form-control"
              placeholder="Picture 2 url" value={this.state.picture2} onChange={this.handlePicture2Change} />
            </td>
          </tr>
				  <tr>
            <td className="col-md-2">
              <div className="btn-group">
                <input type="button" className="btn btn-primary" value="Undo" onClick={this.handleUndo} />
                <input type="button" className="btn btn-success" value="Confirm" onClick={this.handleSubmit} />
              </div>
            </td>
            <td className="col-md-1"></td>
            <td className="col-md-7"> </td> 
				  </tr>
				</tbody>
			];
		} else {
			itemsToRender = [
        <tbody>
          <tr>
            <td className="col-md-2"><input type="button" className="btn btn-primary" value="Add exercise" onClick={this.handleAdd} />
            </td>
            <td className="col-md-1"></td>
            <td className="col-md-7"></td>
          </tr>
        </tbody>
			];
		}
		return (
      <div className="left-within-main">
        <table className="table table-borderless">
          {itemsToRender}
        </table>
      </div>
		);
	}
});

var ExerciseList = React.createClass({
	getInitialState: function() {
	  return {
      exercises: [],
      muscleGroup: ''
    };
  },
	componentDidMount(){
		this.getExercises('http://localhost:3001/api/muscles/' + this.props.params.muscle_id + '/exercises/');
		this.getMuscleGroup('http://localhost:3001/api/muscles/' + this.props.params.muscle_id);
  },
  setMuscle: function(response) {
		this.setState({
			muscleGroup: response
		});
	},
	getMuscleGroup:function(URL){
    $.ajax({
      type:"GET",
      dataType:"json",
      url:URL,
      success: function(response) {
        this.setMuscle(response);
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
	getExercises:function(URL){
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
    var muscle_id = this.props.params.muscle_id;
    $.ajax({
      url: 'http://localhost:3001/api/muscles/' + muscle_id + '/exercises/' + id,
      type: 'DELETE',
      contentType: 'application/json'
    });
    document.location.reload(true);
  },
  updateExercise: function(id, name) {
    var muscle_id = this.props.params.muscle_id;
    $.ajax({
      url: 'http://localhost:3001/api/muscles/' + muscle_id + '/exercises/' + id,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        name: name
      }),
      dataType: 'json'
    });
    document.location.reload(true);
  },
  addExercise:function(name, descriptions, pictures) {
    var muscle_id = this.props.params.muscle_id;
    var group = this.state.muscleGroup.name;
    $.ajax({
			url: 'http://localhost:3001/api/muscles/' + muscle_id + '/exercises/',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				muscle_id: muscle_id,
				name: name,
				group: group,
				descriptions: descriptions,
				pictures: pictures
			}),
			dataType: 'json'
		});
		this.setState({});
		document.location.reload(true);
  },
	render: function() {
		var muscleGroup = '';
    var exercises = [];
    
		for(var i = 0; i < this.state.exercises.exercises.length; i++) {
      exercises.push(this.state.exercises.exercises[i]);
    };
    //console.log(exercises);
    if(exercises.length <1) {
      muscleGroup = this.state.muscleGroup.name;
    } else {
      muscleGroup = exercises[0].group;
    }
		
    var displayedExercises = exercises.map(function(exercise, index) {
      return (
        <Exercise id={exercise._id} key={index} muscle_id={exercise.muscle_id} name={exercise.name}
          deleteExerciseHandler={this.deleteExercise} updateExerciseHandler={this.updateExercise}
        />
      );
    }.bind(this));
    var headerValue = "Exercises (" + muscleGroup + ")";
		return (
			<div>
				<Header headerValue={headerValue}/>
        <ul className="list-group">
          {displayedExercises}
        </ul>
        <AddExerciseForm addExerciseHandler={this.addExercise}/>
    </div>
		);
	}
});

export default ExerciseList;