import React from 'react';
import './App.css';
import api from './test/stubAPI';
import { Link } from 'react-router';
import $ from "jquery";
import {Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Header from './Header';

var MuscleGroupSession = React.createClass({
	getInitialState : function() {
		return {
		  id: this.props.id,
      tsession_id: this.props.tsession_id,
      user_id: this.props.user_id,
      name: this.props.name
		};
	},
	handleDeleteSessionItem : function(e) {
	  e.preventDefault();
	  this.props.deleteSessionItemHandler(this.state.id);
	}, 
	render: function() {
		var deleteHandler = this.handleDeleteSessionItem;
    var msession_id = this.state.id;
    var user_id = this.state.user_id;
    var tsession_id = this.state.tsession_id;
		var name = this.state.name;
		return (
      <li className="list-group">
        <div>
          <table className="table">
            <tbody>
              <tr>
                <td className="col-md-1"></td>
                <td className="col-md-2"><Link to={'/api/users/' + user_id + '/tsessions/' + tsession_id +'/msessions/' + msession_id + '/exerciseunits'}>{name} </Link></td>
                <td className="col-md-2"><input type="button"  className="btn btn-warning" value="delete" onClick={deleteHandler}/></td>
                <td className="col-md-7"></td>
              </tr>
            </tbody>
          </table>
         </div>
      </li>
		)
	}
});

var AddMuscleGroupSessionForm = React.createClass({
	getInitialState : function() {
		return {
      status : '',
      name: ''
	  };
	},
	handleMuscleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
	
	handleAddMuscle: function(e) {
		e.preventDefault();
		var name = this.state.name;
		if (name.length > 2) {
			this.props.addMuscleGroupSessionHandler(name);
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
                placeholder="Type muscle group" onChange={this.handleMuscleNameChange}/>
              </td>
              <td className="col-md-2"><input type="button" className="btn btn-primary" value="Add muscle group"
                onClick={this.handleAddMuscle} /> 
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

var MuscleGroupSessionList = React.createClass({
	getInitialState: function() {
	  return {
      muscleGroupSessions: []
		};
  },
  componentDidMount(){
    this.getMuscleGroupSessionsFromServer('http://localhost:3001/api/users/' + this.props.params.user_id + '/tsessions/' + this.props.params.tsession_id + '/msessions/');
  },
  populateMuscleGroupSessions: function(response) {
    this.setState({
      muscleGroupSessions: response
    });
  },
	getMuscleGroupSessionsFromServer:function(URL){
    $.ajax({
      type:"GET",
      dataType:"json",
      url:URL,
      success: function(response) {
        this.populateMuscleGroupSessions(response);
        //console.log(response);
      }.bind(this),
        error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  deleteMuscleGroupSession:function(id) {
    var user_id = this.props.params.user_id;
    var tsession_id = this.props.params.tsession_id;
    $.ajax({
      url: 'http://localhost:3001/api/users/' + user_id + '/tsessions/' + tsession_id + '/msessions/' + id,
      type: 'DELETE',
      contentType: 'application/json'
    });
    document.location.reload(true);
  },
  addMuscleGroupSession:function(name) {
    var user_id = this.props.params.user_id;
    var tsession_id = this.props.params.tsession_id;
    $.ajax({
			url: 'http://localhost:3001/api/users/' + user_id + '/tsessions/' + tsession_id + '/msessions/',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				user_id: user_id,
        tsession_id: tsession_id,
				name: name,
			}),
			dataType: 'json'
		});
		this.setState({});
		document.location.reload(true);
  },
	render: function() {
		var allMuscles = this.state.allMuscles;
		//console.log(allMuscles);
		var muscleGroupSessions = [];
		for(var i = 0; i < this.state.muscleGroupSessions.msessions.length; i++) {
      muscleGroupSessions.push(this.state.muscleGroupSessions.msessions[i]);
    };
    var displayedMsessions = muscleGroupSessions.map(function(msession, index) {
      return (
        <MuscleGroupSession id={msession._id} key={index} user_id={msession.user_id} tsession_id={msession.tsession_id}
          name = {msession.name} deleteSessionItemHandler={this.deleteMuscleGroupSession}
        />
      );
    }.bind(this));
    var headerValue = '';
		return (
		<div >
			<Header headerValue={headerValue}/>
      <ul className="list-group">
        {displayedMsessions}
      </ul>
			<AddMuscleGroupSessionForm addMuscleGroupSessionHandler={this.addMuscleGroupSession}/>
		</div>
	  ) ;
	}
});

export default MuscleGroupSessionList;