import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import BarChart from 'react-bar-chart';
import './App.css';
//const low = require('lowdb');
import api from './test/stubAPI';
import _ from 'lodash';


export default class SelectableDay extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
  }
  state = {
    selectedDay: null,
  };
  handleDayClick(e, day, { selected }) {
    this.setState({
      selectedDay: selected ? null : day,
    });
  }
  render() {
    const { selectedDay } = this.state;
    return (
      <div>
        <DayPicker
          selectedDays={ day => DateUtils.isSameDay(selectedDay, day) }
          onDayClick={ this.handleDayClick }
        />
        <div className="centered">
          { selectedDay ? selectedDay.toLocaleDateString() : 'Please select a day ??' }
        </div>
      </div>
    );
  }
};

const data = [
  {text: '04/07', value: 110}, 
  {text: '11/07', value: 112},
  {text: '18/07', value: 114},
  {text: '25/07', value: 114},
  {text: '01/08', value: 116}, 
  {text: '08/08', value: 116},
  {text: '15/08', value: 116},
  {text: '22/08', value: 120} 
];
 
var margin = {top: 20, right: 20, bottom: 30, left: 40};

var EditProfileForm = React.createClass({
	render() {
		return (
			<div className="centered">
			
			  <input type="text" className="form-control" 
                     placeholder="First name"/>
					 
			 <input type="text" className="form-control" 
                     placeholder="Surname"/>
			 <input type="text" className="form-control" 
                     placeholder="DOB"/>
			 <input type="text" className="form-control" 
                     placeholder="Training from"/>
				<input type="fluid button" className="btn btn-primary btn-block" value="Submit"
                       onClick={this.handleSubmit} />
			  
		 </div>
		)
	}
});

var Chart = React.createClass({
  
 /*
  componentDidMount: () => {
    var domNode = this.getDOMNode();
 
    window.onresize = () => {
     this.setState({width: domNode.offsetWidth}); 
    };
  },
  */
 
  render() {
    return (
        <div>
            <div style={{width: '50%'}}> 
                <BarChart ylabel='kg'
                  width={600} //this.state.width
                  height={400}
                  margin={margin}
                  data={data}/>
            </div>
        </div>
    );
  }
});

var ChartDataPicker = React.createClass( {
	render: function(){
		return (
		<div className="search-box">
		 <tr>
              <td>
              <input type="text" className="form-control" 
                     placeholder="Start typing Exercise name"
              />
              </td>
              <td>
              <input type="text" className="form-control"
                     placeholder="Date from"
              />
              </td>
              <td>
              <input type="text" className="form-control" 
                     placeholder="Date to"
              />
              </td>
              <td>
              <input type="button" className="btn btn-primary" value="Generate chart"
                       onClick={this.handleSubmit} />
              </td>
            </tr>
      </div>
		)
	}
})
var SearchBox = React.createClass({
	handleChange : function(e, type,value) {
           e.preventDefault();
           this.props.onUserInput( type,value);
      },
      handleTextChange : function(e) {
          this.handleChange( e, 'search', e.target.value);
      },
      handleSortChange : function(e) {
          this.handleChange(e, 'sort', e.target.value);
      },
  render: function(){
    return (
      <div className="search-box">
        <input type="text" placeholder="Search" value={this.props.filterText}
                          onChange={this.handleTextChange}/>
        Sort by:
        <select id="sort" value={this.props.order } 
                         onChange={this.handleSortChange} >
                       <option value="dob">Newest</option>
					   <option value="training_from">Training (Years)</option>
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
		 <table className="table">
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

var ExerciseInfo = React.createClass({
	render: function() {
		return (
		<div>
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
			<div className="main-content-with-search-box">
                      <ul className="users">
                          {displayedUsers}
                      </ul>
                    </div>
              ) ;
	}
});

var Session = React.createClass({
	render: function() {
		var sessionItem = this.props.sessionItem;
		return (
		
		<li>
		<div className="left-within-main">
<table className="table table-borderless">
    <tbody>
      <tr>
	      <td className="col-md-3"><a  href={"/sessions/" + sessionItem.id}>{sessionItem.name} </a></td>
    <td className="col-md-6"><input type="button"  className="btn btn-warning" value="delete"/></td>
    <td className="col-md-2"></td>
    <td className="col-md-1"></td>
      </tr>
    </tbody>
  </table>
			 </div>
		</li>
		)
	}
});


var SessionsList = React.createClass({
	render: function() {
		var displayedSessions = this.props.msessions.map((session) =>{
			return <Session key={session.id} sessionItem={session} />;
		}) ;
            return (
                    <div className="main-content">
                      <ul className="users">
                          {displayedSessions}
                      </ul>
                    </div>
              ) ;
	}
});

var AddExerciseUnitForm = React.createClass({
	render: function() {
            return (
			
				<div className="left-within-main">
										<table className="table table-borderless">
    <tbody>
      <tr>
	      
    <td className="col-md-4"><input type="text" className="form-control" 
				 placeholder="Type exercise name"
		  /></td>
    <td className="col-md-3"><input type="button" className="btn btn-primary" value="Add Exercise"
				   onClick={this.fillInLater} /> </td>
				   <td className="col-md-1"></td>
    <td className="col-md-4"> </td>
      </tr>
    </tbody>
  </table>
				</div>
				

		  ) ;
	}
});

var AddExerciseForm = React.createClass({
	render: function() {
            return (
			
				<div className="left-within-main">
										<table className="table table-borderless">
    <tbody>
      <tr>
	      
    <td className="col-md-4"><input type="text" className="form-control" 
				 placeholder="Exercise name"
		  /></td>
    <td className="col-md-3"><input type="button" className="btn btn-primary" value="Add new exercise"
				   onClick={this.fillInLater} /> </td>
				   <td className="col-md-1"></td>
    <td className="col-md-4"> </td>
      </tr>
    </tbody>
  </table>
				</div>
				

		  ) ;
	}
});

var Muscle = React.createClass({
	render: function() {
		var muscle = this.props.muscle;
		return (
		
		<li>
		<div className="left-within-main">
<table className="table table-borderless">
    <tbody>
      <tr>
	      <td className="col-md-6"><a  href={"/sessions/" + muscle.name}>{muscle.name} </a></td>
    <td className="col-md-2"><input type="button"  className="btn btn-primary btn-block" value="edit"/></td>
    <td className="col-md-2"><input type="button"  className="btn btn-warning btn-block" value="delete"/></td>
    <td className="col-md-2"></td>
      </tr>
    </tbody>
  </table>
			 </div>
		</li>
		)
	}
});


var MuscleList = React.createClass({
	render: function() {
		var displayedMuscles = this.props.muscles.map((muscle) =>{
			return <Muscle key={muscle.name} muscle={muscle} />;
		}) ;
            return (
                    <div className="main-content">
                      <ul className="users">
                          {displayedMuscles}
                      </ul>
                    </div>
              ) ;
	}
});

var Exercise = React.createClass({
	render: function() {
		var exercise = this.props.exercise;
		return (
		
		<li>
		<div className="left-within-main">
<table className="table table-borderless">
    <tbody>
      <tr>
	      <td className="col-md-6"><a  href={"/exercises/" + exercise.name}>{exercise.name} </a></td>
    <td className="col-md-2"><input type="button"  className="btn btn-primary btn-block" value="edit"/></td>
    <td className="col-md-2"><input type="button"  className="btn btn-warning btn-block" value="delete"/></td>
    <td className="col-md-2"></td>
      </tr>
    </tbody>
  </table>
			 </div>
		</li>
		)
	}
});


var ExerciseList = React.createClass({
	render: function() {
		var Exercises = this.props.exercises.map((exercise) =>{
			return <Exercise key={exercise.name} exercise={exercise} />;
		}) ;
            return (
                    <div className="main-content">
                      <ul className="users">
                          {Exercises}
                      </ul>
                    </div>
              ) ;
	}
});

var ExerciseUnit = React.createClass({
	render: function() {
		var exerciseUnit = this.props.exerciseUnit;
		return (
		
		<li>
		<div className="left-within-main">
<table className="table table-borderless">
    <tbody>
      <tr>
	      <td className="col-md-6"><a  href={"/sessions/" + exerciseUnit.name}>{exerciseUnit.name} </a></td>
    <td className="col-md-2"><input type="button"  className="btn btn-primary btn-block" value="edit"/></td>
    <td className="col-md-2"><input type="button"  className="btn btn-warning btn-block" value="delete"/></td>
    <td className="col-md-2"></td>
      </tr>
    </tbody>
  </table>
			 </div>
		</li>
		)
	}
});


var ExerciseUnitList = React.createClass({
	render: function() {
		var displayedExercises = this.props.exerciseUnits.map((exercise) =>{
			return <ExerciseUnit key={exercise.name} exerciseUnit={exercise} />;
		}) ;
            return (
                    <div className="main-content">
                      <ul className="users">
                          {displayedExercises}
                      </ul>
                    </div>
              ) ;
	}
});

var TrainingSession = React.createClass({
	render: function() {
		var trainingSessionItem = this.props.trainingSessionItem;
		return (
		<li >
			<a  href={"/tsessions/" + trainingSessionItem.date}>{trainingSessionItem.date}</a>
		</li>
		)
	}
});

var FilteredTrainingSessionsList = React.createClass({
	render: function() {
		var user = this.props.users[0];
		var displayedTsessions = user.training_sessions.map((tsession) =>{
			return <TrainingSession key={tsession.id} trainingSessionItem={tsession} />;
		}) ;
            return (
                    <div className="main-content">
                      <ul className="users">
                          {displayedTsessions}
                      </ul>
                    </div>
              ) ;
	}
});

var AddMuscleGroupSessionForm = React.createClass({
	render: function() {
            return (
			
				<div className="left-within-main">
				<table className="table table-borderless">
    <tbody>
      <tr>
	      
    <td className="col-md-4"><input type="text" className="form-control" 
				 placeholder="Type muscle group"/></td>
    <td className="col-md-3"><input type="button" className="btn btn-primary" value="Add muscle group"
				   onClick={this.fillInLater} /> </td>
				   <td className="col-md-1"></td>
    <td className="col-md-4"> </td>
      </tr>
    </tbody>
  </table>
				
				</div>
		  ) ;
	}
});

var AddMuscleForm = React.createClass({
	render: function() {
            return (
			
				<div className="left-within-main">
				<table className="table table-borderless">
    <tbody>
      <tr>
	      
    <td className="col-md-4"><input type="text" className="form-control" 
				 placeholder="Add new muscle"/></td>
    <td className="col-md-3"><input type="button" className="btn btn-primary" value="Add muscle"
				   onClick={this.fillInLater} /> </td>
				   <td className="col-md-1"></td>
    <td className="col-md-4"> </td>
      </tr>
    </tbody>
  </table>
				
				</div>
				) ;
	}
});

var MainContent = React.createClass({
	render: function() {
		return (
		//{/* conditional... !!!!!!!!!!! */}
		<div> {/*className="main-content-without-search-box">*/}
		{/*<EditProfileForm/>*/}
		{/*<Chart/>*/}
		{/*<UserInfo />*/}
		<FilteredUsersList  users={this.props.users}/>
		{/*<FilteredTrainingSessionsList users={this.props.users} />*/}
		{/*<SessionsList  msessions={this.props.msessions}/>*/}
		{/*<AddMuscleGroupSessionForm/>*/}
			{/*<ExerciseUnitList exerciseUnits={this.props.exerciseUnits}/>*/}
		{/*<MuscleList muscles={this.props.muscles}/>*/}
		{/*<AddMuscleForm/>*/}
		{/*<ExerciseList exercises={this.props.exercises}/>*/}
		{/*<ExerciseInfo/>*/}
		<div className="calendar">
		{/*<SelectableDay />*/}
		{/*<AddMuscleGroupSessionForm/>*/}
		{/*<AddExerciseUnitForm/>*/}
		{/*<AddExerciseUnitForm/>*/}
		{/*<AddExerciseForm/>*/}
		</div>
		</div>
		)
	}
});

var GymProgressLogger = React.createClass({
	getInitialState: function() {
           return { search: '', sort: 'dob' } ;
      },
	  handleChange : function(type,value) {
        if ( type == 'search' ) {
            this.setState( { search: value } ) ;
          } else {
             this.setState( { sort: value } ) ;
          }
      }, 
  render: function(){
	   var users = api.getAllUsers();
	   var list = users.filter(function(p) {
                  return p.surname.toLowerCase().search(
                      this.state.search.toLowerCase() ) != -1 ;
                    }.bind(this) );
            var filteredList = _.sortBy(list, this.state.sort) ;
	 
	  var exercises = api.getAllExercises();
	  var muscles = api.getAllMuscles();
	  var exerciseUnits = api.getAllExerciseUnits();
	  var muscleSessions = api.getAllMuscleSessions();
	  return (
	  <div>
	  
		<Navbar />
        <Sidebar/>
		{/*<MonthPicker/>*/}
		<SearchBox onUserInput={this.handleChange } 
                           filterText={this.state.search} 
                           sort={this.state.sort}/>
		{/*<ChartDataPicker/>*/}
        <MainContent users={filteredList} 
		msessions={muscleSessions} exerciseUnits={exerciseUnits} 
		muscles={muscles} exercises={exercises}/>
		
		
		  <Footer />
		  </div>
	  );
  }
});

export default GymProgressLogger;
