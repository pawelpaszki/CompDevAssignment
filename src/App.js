import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './App.css';

var SearchBox = React.createClass({
  render: function(){
    return (
      <div className="search-box">
        <input type="text" placeholder="Search" />
        Sort by:
        <select>
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </div>
    );
  }
});

var UserInfo = React.createClass({
	render: function() {
		return (
		<div>
		<div className="left-within-main">
		 <table className="table table-hover">
    <thead>
      <tr>
        <th>User name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>dob</td>
      </tr>
      <tr>
        <td>number of sessions</td>
      </tr>
    </tbody>
  </table>
		</div>
		<div className="right-within-main">
		<img className="thumb" src="assets/users/4.jpg" alt="placeholder"/>
		   
		</div>
		</div>
		
		)
	}
	
});

var Sidebar = React.createClass({
  render: function(){
	  return (
		<div className="side-bar">
		  <div className="list-group">
			<a href="#" className="list-group-item">Training Sessions</a>
			<a href="#" className="list-group-item">Graphs</a>
			<a href="#" className="list-group-item">Calendar</a>
		  </div>
		</div>
		)
  }	
});

var User = React.createClass({
		render: function() {
			var userItem = this.props.userItem;
			return (
			<li>
				<img className="thumb" src={userItem.picture} alt={userItem.first_name}/>
				<a href={"/users/" + userItem.id}>{userItem.first_name} {userItem.surname}</a>
			</li>
			)
		}
	});
	
var FilteredUsersList = React.createClass({
	render: function() {
		var displayedUsers = this.props.users.map((user) =>{
			return <User key={user.id} userItem={user} />;
		}) ;
            return (
                    <div className="main-content">
                      <ul className="users">
                          {displayedUsers}
                      </ul>
                    </div>
              ) ;
	}
});




var MainContent = React.createClass({
	render: function() {
		return (
		
		<div className="main-content">
		<UserInfo />
		{/*<FilteredUsersList  users={this.props.users}/>*/}
		</div>
		)
	}
});

var GymProgressLogger = React.createClass({
  render: function(){
	  return (
	  <div>
	  
		<Navbar />
        <Sidebar/>
		<SearchBox/>
        <MainContent users={this.props.users}/>
		  <Footer />
		  </div>
	  );
  }
});

export default GymProgressLogger;
