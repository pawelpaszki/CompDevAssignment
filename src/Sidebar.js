import React from 'react';
import './App.css';
import { Link } from 'react-router';
import { browserHistory } from 'react-router'

var Sidebar = React.createClass({
  render: function(){
	  return (
		<div className="side-bar">
		  <div className="list-group">
		  <Link to="/" style={{ textDecoration: 'none' }}>
			<button className="btn btn-default btn-block">Home</button>
		  </Link>
		  <button className="btn btn-default btn-block" onClick={browserHistory.goBack}>Go back</button>
		  </div>
		</div>
	  )
  }	
});

export default Sidebar;