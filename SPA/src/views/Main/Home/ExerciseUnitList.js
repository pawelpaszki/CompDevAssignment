import React from 'react';
import './App.css';
import { Link } from 'react-router';
import $ from "jquery";
import {Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Header from './Header';

var ExerciseUnit = React.createClass({
	getInitialState : function() {
		return {
      status: '',
      id: this.props.id,
      user_id: this.props.user_id,
      tsession_id: this.props.tsession_id,
      msession_id: this.props.msession_id,
		  name: this.props.name,
		  weight: this.props.weight,
		  number_of_series: this.props.number_of_series,
		  number_of_reps: this.props.number_of_reps
		};
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
		this.props.updateExerciseUnitHandler(this.state.id, weight, number_of_series, number_of_reps);
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
		var itemsToRender;
		if(this.state.status == '') {
			itemsToRender = [
        <tbody>
          <tr>
            <td className="col-md-1"></td>
            <td className="col-md-3">{this.state.name} </td>
            <td className="col-md-1"><input type="button"  className="btn btn-warning btn-block" value="edit" onClick={editHandler}/></td>
            <td className="col-md-1"><input type="button"  className="btn btn-danger btn-block" value="delete" onClick={deleteHandler}/></td>
            <td className="col-md-7"></td>
          </tr>
        </tbody>
			];
		} else {
			itemsToRender = [
        <tbody>
          <tr>
            <td className="col-md-1"></td>
            <td className="col-md-3">{this.state.name}</td>
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
	getInitialState : function() {
		return {
      status : '',
      name: ''
	  };
	},
	handleExerciseUnitNameChange: function(e) {
    this.setState({name: e.target.value});
  },
	
	handleAddExerciseUnit: function(e) {
		e.preventDefault();
		var name = this.state.name;
		if (name.length > 2) {
			this.props.addExerciseUnitHandler(name);
		} else {
			this.setState({name: ''})
		}
	},
	render: function() {
    return (
      <div>
				<table className="table table-borderless">
          <tbody>
            <tr>
              <td key={'name'} className="col-md-2"><input type="text" className="form-control" 
                placeholder="Type exercise name" onChange={this.handleExerciseUnitNameChange}/>
              </td>
              <td className="col-md-2"><input type="button" className="btn btn-primary" value="Add exercise unit"
                onClick={this.handleAddExerciseUnit} /> 
              </td>
              <td className="col-md-1"></td>
              <td className="col-md-7"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
	}
});

var ExerciseUnitList = React.createClass({
	getInitialState: function() {
	  return {
		  exerciseUnits: [],
		  muscleGroup: ''
		};
  },
  componentDidMount(){
    this.getAllExerciseUnitsFromServer('http://localhost:3001/api/users/' + this.props.params.user_id + '/tsessions/' + this.props.params.tsession_id + '/msessions/' + this.props.params.msession_id + '/exerciseunits/');
    this.getMuscleGroupSession('http://localhost:3001/api/users/' + this.props.params.user_id + '/tsessions/' + this.props.params.tsession_id + '/msessions/' + this.props.params.msession_id);
  },
  populateExerciseUnits: function(response) {
		this.setState({
			exerciseUnits: response
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
  updateExerciseUnit: function(id, weight, number_of_series, number_of_reps) {
    var user_id = this.props.params.user_id;
    var tsession_id = this.props.params.tsession_id;
    var msession_id = this.props.params.msession_id;
    $.ajax({
      url: 'http://localhost:3001/api/users/' + user_id + '/tsessions/' + tsession_id + '/msessions/' + msession_id + '/exerciseunits/' + id,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        weight, weight,
        number_of_series: number_of_series,
        number_of_reps: number_of_reps,
      }),
      dataType: 'json'
    });
    document.location.reload(true);
  },
  deleteExerciseUnit:function(id) {
    var user_id = this.props.params.user_id;
    var tsession_id = this.props.params.tsession_id;
    var msession_id = this.props.params.msession_id;
    $.ajax({
      url: 'http://localhost:3001/api/users/' + user_id + '/tsessions/' + tsession_id + '/msessions/' + msession_id + '/exerciseunits/' + id,
      type: 'DELETE',
      contentType: 'application/json'
      });
    document.location.reload(true);
  },
  addExerciseUnit:function(name) {
    var user_id = this.props.params.user_id;
    var tsession_id = this.props.params.tsession_id;
    var msession_id = this.props.params.msession_id;
    $.ajax({
      url: 'http://localhost:3001/api/users/' + user_id + '/tsessions/' + tsession_id + '/msessions/' + msession_id + '/exerciseunits/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        muscle_group: this.state.muscleGroup.name,
        user_id: user_id,
        tsession_id: tsession_id,
        msession_id: msession_id,
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
		var muscleGroup = '';
    var exerciseUnits = [];
    
		for(var i = 0; i < this.state.exerciseUnits.exerciseunits.length; i++) {
      exerciseUnits.push(this.state.exerciseUnits.exerciseunits[i]);
    };
    console.log(exerciseUnits);
    if(exerciseUnits.length <1) {
      muscleGroup = this.state.muscleGroup.name;
    } else {
      muscleGroup = exerciseUnits[0].muscle_group;
    }
    var displayedExerciseUnits = exerciseUnits.map(function(exerciseunit, index) {
      return (
        <ExerciseUnit id={exerciseunit._id} key={index} user_id={exerciseunit.user_id} tsession_id={exerciseunit.tsession_id}
          msession_id={exerciseunit.msession_id} name = {exerciseunit.name} weight={exerciseunit.weight} 
          number_of_series={exerciseunit.number_of_series} number_of_reps={exerciseunit.number_of_reps} deleteExerciseUnitHandler={this.deleteExerciseUnit}
          updateExerciseUnitHandler={this.updateExerciseUnit}
        />
      );
    }.bind(this));
    var headerValue = muscleGroup + "'s exercises";
		return (
      <div>
        <Header headerValue={headerValue}/>
        <ul className="list-group">
          {displayedExerciseUnits}
        </ul>
        <AddExerciseUnitForm addExerciseUnitHandler={this.addExerciseUnit}/>
      </div>
    );
	}
});

export default ExerciseUnitList;