import React from 'react';
import './App.css';
import { Link } from 'react-router';
import $ from "jquery";
import {Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Header from './Header';

var TrainingSessionItem = React.createClass({
	getInitialState : function() {
		return {
		 status: '',
     user_id: this.props.user_id,
		 _id : this.props.id,
		 date: this.props.date.substring(0,10)
    };
  },
	handleDateChange: function(e) {
	  this.setState({date: e.target.value});
	},
	handleDelete: function(e) {
		e.preventDefault();
		console.log(this.state._id);
		this.props.deleteTrainingSessionHandler(this.state._id);
	},
	handleEdit: function(e) {
		this.setState({ status : 'edit'} )
	},
	handleUndo: function(e) {
		this.setState({ status : ''} )
	},
	handleUpdate: function(e) {
	  e.preventDefault();
	  var date = this.state.date;
	  this.props.updateTrainingSessionHandler(this.state._id, this.state.date);
	  this.setState({ status : ''} )
	},
	render: function() {
		var id = this.state._id;
    var date = this.state.date.substring(0,10);
    var user_id = this.state.user_id;
    var tsession_id = this.state._id;
		var updateHandler = this.handleUpdate;
		var editHandler = this.handleEdit;
		var deleteHandler = this.handleDelete;
		var itemsToRender;
		if(this.state.status == '') {
			itemsToRender = [
        <table >
          <tbody>
            <tr>
              <td className="col-md-1"></td>
              <td key={'index'} className="col-md-4"><Link to={'/api/users/' + user_id + '/tsessions/' + tsession_id +'/msessions'}>{date}</Link></td>
              <td className="col-md-2"><input type="button"  className="btn btn-primary btn-block" value="edit" onClick={editHandler}/></td>
              <td className="col-md-2"><input type="button"  className="btn btn-warning btn-block" value="delete" onClick={deleteHandler}/></td>
              <td className="col-md-2"></td>
            </tr>
          </tbody>
        </table>
			];
		} else {
			itemsToRender = [
        <table>
          <tbody>
            <tr>
              <td className="col-md-1"></td>
              <td key={'main_session_id'} className="col-md-4"><input type="text" className="form-control"  value={this.state.date} onChange={this.handleDateChange}/></td>
              <td className="col-md-2"><input type="button" className="btn btn-primary btn-block" value="undo" onClick={this.handleUndo}/></td>
              <td className="col-md-2"><input type="button" className="btn btn-success btn-block" value="confirm" onClick={updateHandler}/></td>
              <td className="col-md-2"></td>
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

var AddTrainingSessionForm = React.createClass({
	getInitialState : function() {
	  return {
      status : '',
      user_id: this.props.user_id,
      date: ''
	  };
	},
	handleDateChange: function(e) {
    this.setState({date: e.target.value});
  },
	handleAddTrainingSession: function(e) {
		e.preventDefault();
		var date = this.state.date;
    var user_id = this.state.user_id;
	  this.props.addTrainingSessionHandler(date, user_id);
	},
	render: function() {
    return (
      <table className="table table-borderless">
        <tbody>
          <tr>
            <td key={'date'} className="col-md-2"><input type="text" className="form-control" placeholder="Enter date" onChange={this.handleDateChange}/></td>
            <td className="col-md-3"><input type="button" className="btn btn-primary" value="Add session" onClick={this.handleAddTrainingSession} /> </td>
            <td className="col-md-1"></td>
            <td className="col-md-6"> </td>
          </tr>
        </tbody>
      </table>
    );
	}
});

var TrainingSessionsList = React.createClass({
  getInitialState: function() {
    return {
	  	trainingSessions: [],
		  user: ''
		};
  },
  componentDidMount(){
    this.getTrainingSessionsFromServer('http://localhost:3001/api/users/' + this.props.params.user_id + '/tsessions/');
    this.getUserFromServer('http://localhost:3001/api/users/' + this.props.params.user_id);
  },
  populateTrainingSessions: function(response) {
    this.setState({
      trainingSessions: response
    });
  },
	populateUser: function(response) {
    this.setState({
      user: response
    });
  },
  getUserFromServer:function(URL){
    $.ajax({
      type:"GET",
      dataType:"json",
      url:URL,
      success: function(response) {
        this.populateUser(response);
        console.log(response);
      }.bind(this),
        error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
	getTrainingSessionsFromServer:function(URL){
    $.ajax({
      type:"GET",
      dataType:"json",
      url:URL,
      success: function(response) {
        this.populateTrainingSessions(response);
        console.log(response);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  deleteTrainingSession:function(id) {
    var user_id = this.props.params.user_id;
    $.ajax({
      url: 'http://localhost:3001/api/users/' + user_id + '/tsessions/' + id,
      type: 'DELETE',
      contentType: 'application/json'
    });
    document.location.reload(true);
  },
  updateTrainingSession: function(id, date) {
    var user_id = this.props.params.user_id;
    $.ajax({
      url: 'http://localhost:3001/api/users/' + user_id + '/tsessions/' + id,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        date: date
      }),
      dataType: 'json'
    });
    document.location.reload(true);
  },
  addTrainingSession:function(date, user_id) {
    $.ajax({
      url: 'http://localhost:3001/api/users/' + user_id + '/tsessions',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        user_id: user_id,
        date: date
      }),
      dataType: 'json'
    });
    this.setState({});
    document.location.reload(true);
  },
	render: function() {
    //console.log(this.state.user);
    var user = this.state.user;
    //console.log(this.state.trainingSessions.tsessions);
    //console.log(this.props.params.user_id)
    var trainingSessions = [];
    var user_id = this.props.params.user_id;
    for(var i = 0; i < this.state.trainingSessions.tsessions.length; i++) {
      trainingSessions.push(this.state.trainingSessions.tsessions[i]);
    };
    var displayedTsessions = trainingSessions.map(function(tsession, index) {
      return (
        <TrainingSessionItem id={tsession._id} key={index} user_id={tsession.user_id} 
          date = {tsession.date} deleteTrainingSessionHandler={this.deleteTrainingSession}
			    updateTrainingSessionHandler={this.updateTrainingSession}
        />
      );
    }.bind(this));
    var headerValue = user.first_name + " " +  user.surname + "'s sessions";
    return (
      <div>
        <Header headerValue={headerValue}/>
        <ul className="list-group">
        {displayedTsessions }
        </ul>
        <AddTrainingSessionForm addTrainingSessionHandler={this.addTrainingSession} user_id={user_id}/>
      </div>
		 );	
	}
});

export default TrainingSessionsList;