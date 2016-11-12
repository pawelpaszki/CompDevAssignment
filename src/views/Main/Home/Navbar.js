import React from 'react';
import './App.css';
import { Link } from 'react-router';

var Navbar = React.createClass({
  render: function(){
	  return (
		<nav className="navbar navbar-inverse">
		  <div className="container-fluid">
			<div className="navbar-header">
			  <a className="navbar-brand" href="#">Gym Progress Logger</a>
			</div>
			<ul className="nav navbar-nav navbar-right">
			  <li><Link to={'/muscles'}>Muscles & Exercises</Link></li>
			</ul>
		  </div>
		</nav>
	  );
  }
});

export default Navbar;
