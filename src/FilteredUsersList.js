import React from 'react';
import './App.css';

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
		<div>
			
			<div className="main-content-with-search-box">
			  <ul className="listItems">
				  {displayedUsers}
			  </ul>
			</div>
		</div>
	    );
	}
});



export default FilteredUsersList;