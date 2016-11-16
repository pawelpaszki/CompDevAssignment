import React from 'react';
import './App.css';
import api from './test/stubAPI';
import { Link } from 'react-router';
import $ from "jquery";
import {Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Header from './Header';

function isString(value) {
  return typeof value === 'string';
};

var Muscle = React.createClass({
	getInitialState : function() {
		return {
			status: '',
			id: this.props.muscle.id,
		  name: this.props.muscle.name,
		  initName: this.props.muscle.name
		};
	},
	handleNameChange: function(e) {
	  this.setState({name: e.target.value});
	},
	handleDelete: function(e) {
		e.preventDefault();
		if (this.props.muscle.constant != true) {
	       this.props.deleteMuscleHandler(this.state.id, this.state.name);
		};
	},
	handleEdit: function(e) {
    e.preventDefault();
		this.setState({ status : 'edit'});
	},
	handleUndo: function() {
    e.preventDefault();
		this.setState({ status : ''});
	},
	handleUpdate: function(e) {
	  e.preventDefault();
	  var name = this.state.name;
	  if (this.props.muscle.constant != true && isString(name)) {
	    this.props.updateMuscleNameHandler(this.state.id, this.state.name);
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
		if(this.state.status != 'edit') {
			itemsToRender = [
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td className="col-md-1"></td>
              <td key={'name'} className="col-md-2"><Link to={"/musclegroupexercises/" + this.state.id}>{this.state.name} </Link></td>
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
          <tbody>
            <tr>
              <td className="col-md-1"></td>
              <td key={'name'} className="col-md-2"><input type="text" className="form-control"  value={this.state.name} onChange={this.handleNameChange}/></td>
              <td className="col-md-1"><input type="button" className="btn btn-primary btn-block" value="undo" onChange={this.handleUndo}/></td>
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
		);
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
      <table className="table table-borderless">
				<tbody>
				  <tr>
            <td className="col-md-2"><input type="text" className="form-control" placeholder="Add new muscle" 
              value={this.state.name} onChange={this.handleNameChange} /> 
            </td>
            <td className="col-md-2"><input type="button" className="btn btn-primary" value="Add muscle" onClick={this.handleSubmit} /> </td> 
            <td className="col-md-1"></td>
            <td className="col-md-7"></td>
				  </tr>
				</tbody>
      </table>
		) ;
	}
});

var MuscleList = React.createClass({
	getInitialState: function() {
	  return {
		  allMuscles: [],
      exercises: [],
		};
  },
  componentDidMount(){
		this.getAllMuscleGroups('http://localhost:3001/muscles/');
    this.getAllExercises('http://localhost:3001/exercises/');
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
  populateMuscleGroups: function(response) {
		this.setState({
			allMuscles: response
		});
	},
	getAllMuscleGroups:function(URL){
    $.ajax({
      type:"GET",
      dataType:"json",
      url:URL,
      success: function(response) {
        this.populateMuscleGroups(response);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  deleteMuscleGroup:function(id, name) {
    //console.log(name);
    var muscleGroupExerciseIDs = [];
    for(var a = 0; a < this.state.exercises.length; a++) {
      if(this.state.exercises[a].group == name) {
        //console.log(true);
        muscleGroupExerciseIDs.push(this.state.exercises[a].id);
      }
    }
    //console.log(muscleGroupExerciseIDs);
    
    for(a = 0; a < muscleGroupExerciseIDs.length; a++) {
      $.ajax({
        url: 'http://localhost:3001/exercises/' + muscleGroupExerciseIDs[a],
        type: 'DELETE',
        contentType: 'application/json'
      });
    }
    $.ajax({
      url: 'http://localhost:3001/muscles/' + id,
      type: 'DELETE',
      contentType: 'application/json'
    });
    document.location.reload(true);
  },
  addMuscleGroup:function(name) {
    var maxId= 0;
    var allMuscles = this.state.allMuscles;
    for (var i = 0; i < allMuscles.length; i++) {
      if(allMuscles[i].id > maxId) {
        maxId = allMuscles[i].id;
      }
    };
    //console.log("name" + name);
    var id = maxId + 1;
    //console.log("id: " + id);
		   
    $.ajax({
			url: 'http://localhost:3001/muscles',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				id: id,
        constant: false,
				name: name,
			}),
			dataType: 'json'
		});
		this.setState({});
		document.location.reload(true);
  },
  updateMuscle: function(id, name) {
    $.ajax({
			url: 'http://localhost:3001/muscles/' + id,
			type: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify({
				id: id,
        constant: false,
				name: name,
			}),
			dataType: 'json'
		});
		document.location.reload(true);
  },
	render: function() {
		var displayedMuscles = this.state.allMuscles.map((muscle) =>{
			return <Muscle key={muscle.name} muscle={muscle}
			updateMuscleNameHandler={this.updateMuscle} deleteMuscleHandler={this.deleteMuscleGroup}/>;
		});
    var headerValue = "Muscles";
		return (
			<div>
        <Header headerValue={headerValue}/>
        <ul className="list-group">
          {displayedMuscles}
        </ul>
        <AddMuscleForm addMuscleHandler={this.addMuscleGroup} muscles={this.state.allMuscles}/>
			</div>
    );
	}
});

export default MuscleList;