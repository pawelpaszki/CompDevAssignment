import React from 'react';
import './App.css';
import api from './test/stubAPI';
import { Link } from 'react-router';
import $ from "jquery";

var MuscleGroupSession = React.createClass({
	getInitialState : function() {
		 return {
		  id: this.props.sessionItem.id
		 } ;
	  },
	handleDeleteSessionItem : function(e) {
	  e.preventDefault();
	  this.props.deleteSessionItemHandler(this.props.sessionItem.id);
	}, 
	render: function() {
		var deleteHandler = this.handleDeleteSessionItem;
		var sessionItem = this.props.sessionItem;
		return (
		<li>
		<div className="left-within-main">
			<table className="table table-borderless">
				<tbody>
				  <tr>
				<td className="col-md-3"><Link to={'/musclegroupsessions/' + sessionItem.id}>{sessionItem.name} </Link></td>
				<td className="col-md-6"><input type="button"  className="btn btn-warning" value="delete" onClick={deleteHandler}/></td>
				<td className="col-md-2"></td>
				<td className="col-md-1"></td>
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
	   } ;
	},
	handleMuscleNameChange: function(e) {
        this.setState({name: e.target.value});
    },
	
	handleAddMuscle: function(e) {
		e.preventDefault();
		
		var name = this.state.name.trim();
		var muscleNames = _.pluck(this.props.allMuscles, 'name');
		var musclesInSession = _.pluck(this.props.msessions, 'name');
		console.log(musclesInSession);
		console.log(muscleNames);
		console.log(name);
		
		if (muscleNames.indexOf(name) !== -1 && musclesInSession.indexOf(name) === -1) {
			this.props.addMuscleGroupSessionHandler(name);
		} else {
			this.setState({name: ''})
		}
	},
	render: function() {
            return (
			<div className="calendar">
				<div className="left-within-main">
				<table className="table table-borderless">
				<tbody>
				  <tr>
					  
				<td key={'name'} className="col-md-6"><input type="text" className="form-control" 
				placeholder="Type muscle group" onChange={this.handleMuscleNameChange}/></td>
				<td className="col-md-3"><input type="button" className="btn btn-primary" value="Add muscle group"
							   onClick={this.handleAddMuscle} /> </td>
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

var MuscleGroupSessionList = React.createClass({
	getInitialState: function() {
	    return {
		 allMuscleGroupSessions: [],
		 allMuscles: [],
		 trainingSessionId: this.props.params.id
		};
      },
	  componentDidMount(){
        this.getMuscleGroupSessionsFromServer('http://localhost:3000/musclegroupsessions/');
		this.getAllMuscleGroups('http://localhost:3000/muscles/');
      },
        populateMuscleGroupSessions: function(response) {
            this.setState({
                allMuscleGroupSessions: response
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
				console.log(response);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
      },
	 getMuscleGroupSessionsFromServer:function(URL){
        $.ajax({
            type:"GET",
            dataType:"json",
            url:URL,
            success: function(response) {
                this.populateMuscleGroupSessions(response);
				console.log(response);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
      },
	  deleteMuscleGroupSession:function(id) {
		  $.ajax({
			url: 'http://localhost:3000/musclegroupsessions/' + id,
			type: 'DELETE',
			contentType: 'application/json'
			});
			document.location.reload(true);
	  },
	  addMuscleGroupSession:function(name) {
		  var maxId= 0;
		  var muscleGroupSessions = this.state.allMuscleGroupSessions;
		  for (var i = 0; i < muscleGroupSessions.length; i++) {
			  if(muscleGroupSessions[i].id > maxId) {
				  maxId = muscleGroupSessions[i].id;
			  }
		  };
		  console.log("name" + name);
		  var id = maxId + 1;
		  console.log("id: " + id);
		  console.log("main session id: " + this.state.trainingSessionId);
		   
		    $.ajax({
			url: 'http://localhost:3000/musclegroupsessions',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				id: id,
				main_session_id: this.state.trainingSessionId,
				name: name,
			}),
			dataType: 'json'
		});
		this.setState({});
		document.location.reload(true);
	  },
	render: function() {
		var allMuscles = this.state.allMuscles;
		console.log(allMuscles);
		var muscleGroupSessions = [];
		for(var i = 0; i < this.state.allMuscleGroupSessions.length; i++) {
			if(this.state.allMuscleGroupSessions[i].main_session_id == this.state.trainingSessionId) {
				muscleGroupSessions.push(this.state.allMuscleGroupSessions[i]);
			}
		};
		var displayedSessions = muscleGroupSessions.map((session) =>{
			return <MuscleGroupSession key={session.id} sessionItem={session} deleteSessionItemHandler={this.deleteMuscleGroupSession} />;
		}) ;
		return (
		<div className="main-content-without-search-box">
			<div className="main-content">
			  <ul className="listItems">
				  {displayedSessions}
			  </ul>
			</div>
			<AddMuscleGroupSessionForm msessions={this.props.msessions} addMuscleGroupSessionHandler={this.addMuscleGroupSession} allMuscles={allMuscles}/>
			</div>
	  ) ;
	}
});

export default MuscleGroupSessionList;