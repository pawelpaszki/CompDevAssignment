import React from 'react';
import './App.css';
import { Link } from 'react-router';
import $ from "jquery";
import {Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';

function isValidDate(dateString) {
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

var TrainingSessionItem = React.createClass({
	getInitialState : function() {
		return {
		 status: '',
		 id : this.props.trainingSessionItem.id,
		 date: this.props.trainingSessionItem.date,
		 initDate: this.props.trainingSessionItem.date
    };
  },
	handleDateChange: function(e) {
	  this.setState({date: e.target.value});
	},
	handleDelete: function(e) {
		e.preventDefault();
		console.log(this.state.id);
		this.props.deleteTrainingSessionHandler(this.state.id);
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
	  if (isValidDate(date)) {
	    this.props.updateTrainingSessionHandler(this.state.id, this.state.date);
	  } else {
		  this.setState({ date : this.state.initDate});
	  }
	  this.setState({ status : ''} )
	},
	render: function() {
		var trainingSessionItem = this.props.trainingSessionItem;
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
              <td key={'main_session_id'} className="col-md-4"><Link to={'/trainingsessions/' + trainingSessionItem.id}>{trainingSessionItem.date}</Link></td>
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
      date: ''
	  };
	},
	handleDateChange: function(e) {
    this.setState({date: e.target.value});
  },
	handleAddTrainingSession: function(e) {
		e.preventDefault();
		var date = this.state.date;
		if (isValidDate(date)) {
			this.props.addTrainingSessionHandler(date);
		};
		this.setState({date: ''});
	},
	render: function() {
    return (
      <table className="table table-borderless">
        <tbody>
          <tr>
            <td key={'date'} className="col-md-4"><input type="text" className="form-control" placeholder="Enter date" onChange={this.handleDateChange}/></td>
            <td className="col-md-3"><input type="button" className="btn btn-primary" value="Add session" onClick={this.handleAddTrainingSession} /> </td>
            <td className="col-md-1"></td>
            <td className="col-md-2"> </td>
          </tr>
        </tbody>
      </table>
    );
	}
});

var TrainingSessionsList = React.createClass({
  getInitialState: function() {
    return {
	  	allTrainingSessions: [],
		  userId: this.props.params.id,
		  users: []
		};
  },
  componentDidMount(){
    this.getTrainingSessionsFromServer('http://localhost:3001/trainingsessions/');
    this.getUsersFromServer('http://localhost:3001/users/');
  },
  populateTrainingSessions: function(response) {
    this.setState({
      allTrainingSessions: response
    });
  },
	populateUsers: function(response) {
    this.setState({
      users: response
    });
  },
  getUsersFromServer:function(URL){
    $.ajax({
      type:"GET",
      dataType:"json",
      url:URL,
      success: function(response) {
        this.populateUsers(response);
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
      //console.log(response);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  deleteTrainingSession:function(id) {
    $.ajax({
      url: 'http://localhost:3001/trainingsessions/' + id,
      type: 'DELETE',
      contentType: 'application/json'
    });
    document.location.reload(true);
  },
  updateTrainingSession: function(id, date) {
    $.ajax({
    url: 'http://localhost:3001/trainingsessions/' + id,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({
      id: id,
      date: date,
      user_id: this.state.userId,
    }),
    dataType: 'json'
    });
    document.location.reload(true);
  },
	  addTrainingSession:function(date) {
		  var maxId= 0;
		  var trainingSessions = this.state.allTrainingSessions;
		  for (var i = 0; i < trainingSessions.length; i++) {
			  if(trainingSessions[i].id > maxId) {
				  maxId = trainingSessions[i].id;
			  }
		  };
		  var id = maxId + 1;
      $.ajax({
			url: 'http://localhost:3001/trainingsessions',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				user_id: this.state.userId,
				id: id,
				date: date,
			}),
			dataType: 'json'
		});
		this.setState({});
		document.location.reload(true);
  },
	render: function() {
		var user = this.state.users[this.props.params.id - 1];
		var trainingSessions = [];
		for(var i = 0; i < this.state.allTrainingSessions.length; i++) {
			if(this.state.allTrainingSessions[i].user_id == this.state.userId) {
				trainingSessions.push(this.state.allTrainingSessions[i]);
			}
		};
		var displayedTsessions = trainingSessions.map((tsession) =>{
			return <TrainingSessionItem key={tsession.main_session_id} trainingSessionItem={tsession} 
			deleteTrainingSessionHandler={this.deleteTrainingSession}
			updateTrainingSessionHandler={this.updateTrainingSession}/>;
		}) ;
    return (
      <div>
        <Link to="/home" ><button style={{marginRight: 1 + 'em', marginTop: 1 + 'em', paddingLeft: 10 + 'px', paddingRight: 6 + 'px'}} className="nav btn-primary navbar-nav navbar-right">Home</button></Link>
        <Link to="/muscles" ><button style={{marginRight: 1 + 'em',  marginTop: 1 + 'em', paddingLeft: 10 + 'px', paddingRight: 6 + 'px'}} className="nav btn-primary navbar-nav navbar-right">Muscles & Exercises</button></Link>
        <h3> {user.first_name} {user.surname}'s sessions</h3>
        <Button style={{marginLeft: 2 + 'em', marginTop: 1 + 'em', marginBottom: 1 + 'em', paddingLeft: 1 + 'em'}} className="btn primary-btn"onClick={browserHistory.goBack}>Go back</Button>
        <ul className="list-group">
          {displayedTsessions}
        </ul>
        <AddTrainingSessionForm addTrainingSessionHandler={this.addTrainingSession}/>
      </div>
		 );	
	}
});

export default TrainingSessionsList;