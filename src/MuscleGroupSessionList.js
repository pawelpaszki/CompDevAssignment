import React from 'react';
import './App.css';
import api from './test/stubAPI';

var MuscleGroupSessionList = React.createClass({
	render: function() {
		var displayedSessions = this.props.msessions.map((session) =>{
			return <MuscleGroupSession key={session.id} sessionItem={session} deleteSessionItemHandler={this.props.deleteSessionItemHandler} />;
		}) ;
		return (
		<div className="main-content-without-search-box">
			<div className="main-content">
			  <ul className="listItems">
				  {displayedSessions}
				  
			  </ul>
			  
			</div>
			<AddMuscleGroupSessionForm msessions={this.props.msessions} addMuscleGroupSessionHandler={this.props.addMuscleGroupSessionHandler}/>
			</div>
			
	  ) ;
	}
});

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
					  <td className="col-md-3"><a href={"/sessions/" + sessionItem.id}>{sessionItem.name} </a></td>
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
		var muscles = api.getAllMuscles();
		var muscleNames = _.pluck(muscles, 'name');
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

export default MuscleGroupSessionList;