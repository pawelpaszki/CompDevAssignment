import React from 'react';
import { Link } from 'react-router'; 

import './App.css';
import _ from 'lodash';

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

var SearchBox = React.createClass({
	handleChange : function(e, type,value) {
           e.preventDefault();
           this.props.onUserInput( type,value);
      },
      handleTextChange : function(e) {
          this.handleChange( e, 'search', e.target.value);
      },
      handleSortChange : function(e) {
          this.handleChange(e, 'sort', e.target.value);
      },
	render: function(){
    return (
      <div className="search-box">
        <input type="text" placeholder="Search" value={this.props.filterText}
                          onChange={this.handleTextChange}/>
        Sort by:
        <select id="sort" value={this.props.order } 
                         onChange={this.handleSortChange} >
                       <option value="dob">Newest</option>
					   <option value="training_from">Training (Years)</option>
                     </select>
      </div>
    );
  }
});

var User = React.createClass({
	getInitialState : function() {
	 return {
		 status: '',
		 initFname: this.props.userItem.first_name,
		 initSurname: this.props.userItem.surname,
		 initDOB: this.props.userItem.dob,
		 initTrainingFrom: this.props.userItem.training_from,
		 initWeight: this.props.userItem.body_weight,
		 initHeight: this.props.userItem.height,
		 picture: this.props.userItem.picture,
		 id: this.props.userItem.id,
		 first_name : this.props.userItem.first_name,
	     surname: this.props.userItem.surname,
	     dob: this.props.userItem.dob,
	     training_from: this.props.userItem.training_from,
	     body_weight: this.props.userItem.body_weight,
	     height: this.props.userItem.height,
	} ;
	  },
	handleFirstNameChange: function(e) {
	   this.setState({first_name: e.target.value});
	},
	handleSurnameChange: function(e) {
	   this.setState({surname: e.target.value});
	},
	handleDOBChange: function(e) {
	   this.setState({dob: e.target.value});
	},
	handleTrainingFromChange: function(e) {
	   this.setState({training_from: e.target.value});
	},
	handleWeightChange: function(e) {
	   this.setState({body_weight: e.target.value});
	},
	handleHeightChange: function(e) {
	   this.setState({height: e.target.value});
	},
	handleUndo: function(e) {
	   this.setState({ status : ''});
	},
	handleDelete: function(e) {
		e.preventDefault();
		console.log(this.state.id);
		this.props.deleteUserHandler(this.state.id);
	},
	handleEdit: function(e) {
		this.setState({ status : 'edit'});
	},
	handleUpdate: function(e) {
	   e.preventDefault();
	   var first_name = this.state.first_name;
	   var surname = this.state.surname;
	   var dob = this.state.dob;
	   var training_from = this.state.training_from;
	   var body_weight = this.state.body_weight;
	   var height = this.state.height;
	   if(first_name == this.state.initFname && surname == this.state.initSurname && dob == this.state.initDOB && 
	   training_from == this.state.initDOB && body_weight == this.state.initWeight && height == this.state.initHeight) {
		   this.setState({ status : ''});
		   return;
	   }
	   if (isValidDate(training_from) && isValidDate(dob)) {
	       this.props.updateUserHandler(this.state.id, first_name, surname, dob, training_from, body_weight, height, this.state.picture);
	   } else {
		   this.setState({first_name: e.target.value});
		   this.setState({surname: e.target.value});
		   this.setState({dob: 'dd/mm/yyyy'});
		   this.setState({training_from: 'dd/mm/yyyy'});
		   this.setState({weight: e.target.value});
		   this.setState({height: e.target.value});
	   }
	   this.setState({ status : ''});
	},
	render: function() {
		var userItem = this.props.userItem;
		var updateHandler = this.handleUpdate;
		var editHandler = this.handleEdit;
		var deleteHandler = this.handleDelete;
		var itemsToRender;
		if(this.state.status == '') {
			itemsToRender = [
			<table className="table table-borderless">
				<tbody>
				  <tr>
					<td key={'id'} className="col-md-2"><img className="thumb" src={userItem.picture} alt={userItem.first_name}/></td>
					<td className="col-md-2"><Link to={'/users/' + userItem.id}>{userItem.first_name} {userItem.surname}</Link></td>
					<td className="col-md-2"><Link to={'/charts/' + userItem.id}><input type="button" className="btn btn-info btn-block" value="charts"/></Link></td>
					<td className="col-md-2"><Link to={'/calendar/' + userItem.id}><input type="button"  className="btn btn-info btn-block" value="calendar"/></Link></td>
					<td className="col-md-2"><input type="button"  className="btn btn-primary btn-block" value="edit" onClick={editHandler}/></td>
					<td className="col-md-2"><input type="button"  className="btn btn-warning btn-block" value="delete" onClick={deleteHandler}/></td>
				  </tr>
				</tbody>
			</table>
			];
		} else {
			itemsToRender = [
			<table className="table table-borderless">
				<tbody>
				  <tr>
					<td key={'first_name'} className="col-md-2"><input type="text" className="form-control"  value={this.state.first_name} onChange={this.handleFirstNameChange}/></td>
					<td key={'surname'} className="col-md-2"><input type="text" className="form-control"  value={this.state.surname} onChange={this.handleSurnameChange}/></td>
					<td key={'dob'} className="col-md-2"><input type="text" className="form-control"  value={this.state.dob} onChange={this.handleDOBChange}/></td>
					<td key={'training_from'} className="col-md-2"><input type="text" className="form-control"  value={this.state.training_from} onChange={this.handleTrainingFromChange}/></td>
					<td key={'weight'} className="col-md-1"><input type="text" className="form-control"  value={this.state.body_weight} onChange={this.handleWeightChange}/></td>
					<td key={'height'} className="col-md-1"><input type="text" className="form-control"  value={this.state.height} onChange={this.handleHeightChange}/></td>
					<td className="col-md-1"><input type="button" className="btn btn-primary btn-block" value="undo" onClick={this.handleUndo}/></td>
					<td className="col-md-1"><input type="button" className="btn btn-success btn-block" value="confirm" onClick={updateHandler}/></td>
				  </tr>
				</tbody>
			</table>
			];
		};
		return (
			 <li>
				{itemsToRender}
			 </li>
		);
	}
});

var FilteredUsersList = React.createClass({
	render: function() {
		var displayedUsers = this.props.users.map((user) =>{
			return <User key={user.id} userItem={user} updateUserHandler={this.props.updateUserHandler} deleteUserHandler={this.props.deleteUserHandler}/>;
		}) ;
		return (
		<div>
			
			<div className="main-content-with-search-box">
			  <ul className="listItems">
				  {displayedUsers}
			  </ul>
			  <AddUserForm addUserHandler={this.props.addUserHandler}/>
			</div>
			
		</div>
	    );
	}
});

var AddUserForm = React.createClass({
    getInitialState: function() {
        return { 
			first_name: '',
			surname: '',
			dob: '',
			training_from: '',
			body_weight: '',
			height: '',
		};
    },
	handleFirstNameChange: function(e) {
	   this.setState({first_name: e.target.value});
    },
	handleSurnameChange: function(e) {
	   this.setState({surname: e.target.value});
    },
	handleDOBChange: function(e) {
	   this.setState({dob: e.target.value});
    },
	handleTrainingFromChange: function(e) {
	   this.setState({training_from: e.target.value});
    },
	handleWeightChange: function(e) {
	   this.setState({body_weight: e.target.value});
    },
	handleHeightChange: function(e) {
	   this.setState({height: e.target.value});
    },
	handleSubmit: function(e) {
		e.preventDefault();
		//console.log(this.props.muscles);
		var first_name = this.state.first_name;
		var surname = this.state.surname;
		var dob = this.state.dob;
		var training_from = this.state.training_from;
		var body_weight = this.state.body_weight;
		var height = this.state.height;
		if (!first_name || !surname || !dob || !training_from || !isValidDate(dob) || !isValidDate(training_from)) {
			this.setState({first_name: ''});
			this.setState({surname: ''});
			this.setState({dob: ''});
			this.setState({training_from: ''});
			this.setState({body_weight: ''});
			this.setState({height: ''});
            return;
        } else {
			this.props.addUserHandler(first_name, surname, dob, training_from, body_weight, height);
			this.setState({first_name: ''});
			this.setState({surname: ''});
			this.setState({dob: ''});
			this.setState({training_from: ''});
			this.setState({body_weight: ''});
			this.setState({height: ''});
		}
	},
	render: function() {
		return (
			<div>
				<table className="table table-borderless">
				<tbody>
				  <tr>
				<td key={'first_name'} className="col-md-2"><input type="text" className="form-control"
                     placeholder="First name"
                     value={this.state.first_name}
                     onChange={this.handleFirstNameChange} /></td>
				<td key={'surname'} className="col-md-2"><input type="text" className="form-control"
					placeholder="Surname"
					value={this.state.surname}
					onChange={this.handleSurnameChange} /></td>
				<td key={'dob'} className="col-md-2"><input type="text" className="form-control"
                     placeholder="DOB"
                     value={this.state.dob}
                     onChange={this.handleDOBChange} /></td>
				<td key={'training_from'} className="col-md-2"> <input type="text" className="form-control"
                     placeholder="Training from"
                     value={this.state.training_from}
                     onChange={this.handleTrainingFromChange} /></td>
				 <td key={'weight'} className="col-md-2"> <input type="text" className="form-control"
                     placeholder="Weight"
                     value={this.state.weight}
                     onChange={this.handleWeightChange} /></td>
				 <td key={'height'} className="col-md-2"> <input type="text" className="form-control"
                     placeholder="Height"
                     value={this.state.height}
                     onChange={this.handleHeightChange} /></td>
				<td className="col-md-2"><input type="button" className="btn btn-primary" value="Add user"
							   onClick={this.handleSubmit} /> </td>
							   <td className="col-md-1"></td>
				  </tr>
				</tbody>
			  </table>
			</div>
		) ;
	}
});

var GymProgressLogger = React.createClass({
	getInitialState: function() {
	    return { 
		 search: '', 
		 sort: 'dob',
		 users: []
		};
      },
	  componentDidMount(){
        this.getUsersFromServer('http://localhost:3000/users/');
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
	  deleteUser:function(id) {
		  $.ajax({
			url: 'http://localhost:3000/users/' + id,
			type: 'DELETE',
			contentType: 'application/json'
			});
			document.location.reload(true);
	  },
	  updateUser: function(id, first_name, surname, dob, training_from, body_weight, height, picture) {
		    $.ajax({
			url: 'http://localhost:3000/users/' + id,
			type: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify({
				id: id,
				first_name: first_name,
				surname: surname,
				dob: dob,
				body_weight: body_weight,
				height: height,
				training_from: training_from,
				picture: picture
			}),
			dataType: 'json'
		});
		document.location.reload(true);
	  },
	  addUser:function(first_name, surname, dob, training_from, body_weight, height) {
		  var maxId= 0;
		  var users = this.state.users;
		  for (var i = 0; i < users.length; i++) {
			  if(users[i].id > maxId) {
				  maxId = users[i].id;
			  }
		  };
		   var id = maxId + 1;
		    $.ajax({
			url: 'http://localhost:3000/users',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				id: id,
				first_name: first_name,
				surname: surname,
				dob: dob,
				body_weight: body_weight,
				height: height,
				picture: "assets/users/default.jpg",
				training_from: training_from,
			}),
			dataType: 'json'
		});
		document.location.reload(true);
	  },
	  
	  handleChange : function(type,value) {
        if ( type == 'search' ) {
            this.setState( { search: value } ) ;
          } else {
             this.setState( { sort: value } ) ;
          }
      }, 

  render: function(){
	   var users = this.state.users;
	   var userList = users.filter(function(p) {
	   var name = p.first_name + ' ' + p.surname;
			  return name.toLowerCase().search(
				  this.state.search.toLowerCase() ) != -1 ;
				}.bind(this) );
	   var filteredList = _.sortBy(userList, this.state.sort) ;
	  return (
	  <div>
			<SearchBox onUserInput={this.handleChange } 
								   filterText={this.state.search} 
								   sort={this.state.sort}/>
			<FilteredUsersList users={filteredList} addUserHandler={this.addUser} updateUserHandler={this.updateUser} deleteUserHandler={this.deleteUser}/>
		  </div>
	  );
  }
});

export default GymProgressLogger;

