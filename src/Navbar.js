import React from 'react';
import './App.css';

var Navbar = React.createClass({
  render: function(){
	  return (
		<nav className="navbar navbar-inverse">
		  <div className="container-fluid">
			<div className="navbar-header">
			  <a className="navbar-brand" href="#">Gym Progress Logger</a>
			</div>
			<ul className="nav navbar-nav navbar-right">
			  <li><a href="#">Muscles & Exercises</a></li>
			  <li><a href="#">Settings</a></li>
			</ul>
		  </div>
		</nav>
	  );
  }
});

export default Navbar;
