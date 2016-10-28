import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './App.css';

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

var GymProgressLogger = React.createClass({
  render: function(){
	  return (
	    <div>
		  <Navbar />
          <Sidebar/>
		  <Footer />
		</div>
	  );
  }
});

export default GymProgressLogger;
