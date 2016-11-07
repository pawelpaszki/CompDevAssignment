import React from 'react';
import './App.css';
import { Link } from 'react-router';
import $ from "jquery";

var ExerciseInfo = React.createClass({
	getInitialState: function() {
	    return {
		 exercise: '',
		 id: this.props.params.id,
		 path: '',
		};
      },
	  componentDidMount(){
		this.getExercise('http://localhost:3000/exercises/');
      },
	  getExerciseInfo: function(response) {
		var exercises = response;
		for (var i = 0; i < exercises.length; i++) {
			if(this.state.id == exercises[i].id) {
				this.setState({exercise: exercises[i]});
				this.setState({path: exercises[i].picture});
			}
		}
	 },
	 getExercise:function(URL){
        $.ajax({
            type:"GET",
            dataType:"json",
            url:URL,
            success: function(response) {
                this.getExerciseInfo(response);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
      },
	render: function() {
		var imagePath = this.state.exercise.picture;
		console.log(imagePath);
		return (
		
		<div className="main-content-without-search-box">
			<div className="left-within-main">
				 <h3>{this.state.exercise.name}</h3>
				</div>
				<div className="right-within-main">
				<img src={"/" + imagePath}  alt="placeholder"/>
			</div>
		</div>
		)
	}
});

export default ExerciseInfo;