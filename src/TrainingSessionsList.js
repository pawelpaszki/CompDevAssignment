import React from 'react';
import './App.css';
import { Link } from 'react-router';
import $ from "jquery";

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
		} ;
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
			<table className="table table-borderless">
				<tbody>
				  <tr>
					<td key={'main_session_id'} className="col-md-4"><a  href={"/tsessions/" + trainingSessionItem.date}>{trainingSessionItem.date}</a></td>
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
					<td key={'main_session_id'} className="col-md-4"><input type="text" className="form-control"  value={this.state.date} onChange={this.handleDateChange}/></td>
					<td className="col-md-2"></td>
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
		);
	}
});

var AddTrainingSessionForm = React.createClass({
	getInitialState : function() {
	   return {
		status : '',
		date: ''
	   } ;
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
			<div className="calendar">
				<div className="left-within-main">
					<table className="table table-borderless">
						<tbody>
						  <tr>
						<td key={'date'} className="col-md-4"><input type="text" className="form-control" 
						placeholder="Enter date" onChange={this.handleDateChange}/></td>
						<td className="col-md-3"><input type="button" className="btn btn-primary" value="Add session"
									   onClick={this.handleAddTrainingSession} /> </td>
									   <td className="col-md-1"></td>
						<td className="col-md-2"> </td>
						  </tr>
						</tbody>
				  </table>
				
				</div>
			</div>
		  ) ;
	}
});

var TrainingSessionsList = React.createClass({
    getInitialState: function() {
	    return {
		 allTrainingSessions: [],
		 userId: this.props.params.id
		};
      },
	  componentDidMount(){
        this.getTrainingSessionsFromServer('http://localhost:3000/trainingsessions/');
      },
        populateTrainingSessions: function(response) {
            this.setState({
                allTrainingSessions: response
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
		  $.ajax({
			url: 'http://localhost:3000/trainingsessions/' + id,
			type: 'DELETE',
			contentType: 'application/json'
			});
			document.location.reload(true);
	  },
	  updateTrainingSession: function(id, date) {
		    $.ajax({
			url: 'http://localhost:3000/trainingsessions/' + id,
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
			url: 'http://localhost:3000/trainingsessions',
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
				<div className="main-content-without-search-box">
				  <ul className="listItems">
					  {displayedTsessions}
				  </ul>
			<AddTrainingSessionForm addTrainingSessionHandler={this.addTrainingSession}/>
				</div>
		  ) ;	
	}
});

export default TrainingSessionsList;