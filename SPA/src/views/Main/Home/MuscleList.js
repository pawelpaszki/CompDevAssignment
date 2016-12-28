import React from 'react';
import './App.css';
import api from './test/stubAPI';
import { Link } from 'react-router';
import $ from "jquery";
import {Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Header from './Header';

var Muscle = React.createClass({
	getInitialState : function() {
		return {
			status: '',
			id: this.props.id,
		  name: this.props.name
		};
	},
	handleNameChange: function(e) {
	  this.setState({name: e.target.value});
	},
	handleDelete: function(e) {
		e.preventDefault();
	  this.props.deleteMuscleHandler(this.state.id);
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
	  if (name.length > 2) {
	    this.props.updateMuscleNameHandler(this.state.id, this.state.name);
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
              <td key={'name'} className="col-md-2"><Link to={"/api/muscles/" + this.state.id + '/exercises'}>{this.state.name} </Link></td>
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
		e.preventDefault();
		var name = this.state.name;
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
		  muscles: []
		};
  },
  componentDidMount(){
		this.getAllMuscleGroups('http://localhost:3001/api/muscles/');
  },
  populateMuscleGroups: function(response) {
		this.setState({
			muscles: response
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
  deleteMuscleGroup:function(id) {
    $.ajax({
      url: 'http://localhost:3001/api/muscles/' + id,
      type: 'DELETE',
      contentType: 'application/json'
    });
    document.location.reload(true);
  },
  addMuscleGroup:function(name) { 
    $.ajax({
			url: 'http://localhost:3001/api/muscles/',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				name: name,
			}),
			dataType: 'json'
		});
		this.setState({});
		document.location.reload(true);
  },
  updateMuscle: function(id, name) {
    $.ajax({
			url: 'http://localhost:3001/api/muscles/' + id,
			type: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify({
				name: name,
			}),
			dataType: 'json'
		});
		document.location.reload(true);
  },
	render: function() {
    var muscles = [];
    //console.log(this.state.muscles);
    for(var i = 0; i < this.state.muscles.muscles.length; i++) {
      muscles.push(this.state.muscles.muscles[i]);
    };
    var displayedMuscles = muscles.map(function(muscle, index) {
      return (
        <Muscle id={muscle._id} key={index} name = {muscle.name} 
        deleteMuscleHandler={this.deleteMuscleGroup} updateMuscleNameHandler={this.updateMuscle}
        />
      );
    }.bind(this));
    var headerValue = "Muscles";
		return (
			<div>
        <Header headerValue={headerValue}/>
        <ul className="list-group">
          {displayedMuscles}
        </ul>
        <AddMuscleForm addMuscleHandler={this.addMuscleGroup}/>
			</div>
    );
	}
});

export default MuscleList;