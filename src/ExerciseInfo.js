import React from 'react';
import './App.css';

var ExerciseInfo = React.createClass({
	render: function() {
		return (
		<div className="main-content-without-search-box">
		<div className="left-within-main">
		 <h1>Bench press</h1>
		</div>
		<div className="right-within-main">
		<img src="assets/exercises/flatbench.jpg" alt="placeholder"/>
		</div>
		</div>
		)
	}
});

export default ExerciseInfo;