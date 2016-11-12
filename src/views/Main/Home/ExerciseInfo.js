import React from 'react';
import './App.css';
import { Link } from 'react-router';
import $ from "jquery";
import {Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';

var ExerciseInfo = React.createClass({
	getInitialState: function() {
	    return {
		 exercise: '',
		 id: this.props.params.id,
		 path: '',
		};
      },
	  componentDidMount(){
		this.getExercise('http://localhost:3001/exercises/');
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
		
		<div>
		   <Link to="/home" ><button style={{marginRight: 1 + 'em', marginTop: 1 + 'em', paddingLeft: 10 + 'px', paddingRight: 6 + 'px'}} className="nav btn-primary navbar-nav navbar-right">Home</button></Link>
		   <Link to="/muscles" ><button style={{marginRight: 1 + 'em',  marginTop: 1 + 'em', paddingLeft: 10 + 'px', paddingRight: 6 + 'px'}} className="nav btn-primary navbar-nav navbar-right">Muscles & Exercises</button></Link>
				<Button style={{marginLeft: 2 + 'em', marginTop: 1 + 'em', marginBottom: 1 + 'em', paddingLeft: 1 + 'em'}} className="btn primary-btn"onClick={browserHistory.goBack}>Go back</Button>
			 <h3>{this.state.exercise.name}</h3>
			<img src={"/" + imagePath}  alt="placeholder"/>
		</div>
		)
	}
});

export default ExerciseInfo;