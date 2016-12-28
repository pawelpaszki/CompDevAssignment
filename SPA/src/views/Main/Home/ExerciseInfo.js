import React from 'react';
import './App.css';
import { Link } from 'react-router';
import $ from "jquery";
import {Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Header from './Header';

var ExerciseInfo = React.createClass({
	getInitialState: function() {
	  return {
      exercise: ''
		};
  },
  componentDidMount(){
		this.getExercise('http://localhost:3001/api/muscles/' + this.props.params.muscle_id + '/exercises/' + this.props.params.exercise_id);
  },
  setExerciseInfo: function(response) {
    this.setState({
      exercise: response
    });
	},
  getExercise:function(URL){
    $.ajax({
      type:"GET",
      dataType:"json",
      url:URL,
      success: function(response) {
        this.setExerciseInfo(response);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
	render: function() {
    console.log(this.state.exercise);
		var imagePath1 = this.state.exercise.pictures[0].start;
		var imagePath2 = this.state.exercise.pictures[0].finish;
		var descriptions = this.state.exercise.descriptions.map(function(description, index){
			return (
				<ul className="list-group" key={index} >
				  <p> {description.step} </p>
				</ul> 
      );
    });
    var headerValue = this.state.exercise.name;
    return (
      <div>
        <Header headerValue={headerValue}/>
        <div style={{marginLeft: 5 + '%', marginRight: 5 + '%'}}>{descriptions}</div>
        <img src={imagePath1} style={{width: 40 + '%', marginLeft: 7 + '%'}} alt="placeholder"/>
        <img src={imagePath2} style={{width: 40 + '%', marginLeft: 6 + '%'}} alt="placeholder"/>
      </div>
    )
	}
});

export default ExerciseInfo;