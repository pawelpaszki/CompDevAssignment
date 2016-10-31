import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import BarChart from 'react-bar-chart';
import './App.css';
//const low = require('lowdb');


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
  render: function(){
    return (
      <div className="search-box">
        <input type="text" placeholder="Search" />
        Sort by:
        <select>
          <option value="age">Oldest</option>
          <option value="age">Newest</option>
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
                    <div className="main-content">
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
			<a href={"/sessions/" + sessionItem.id}>{sessionItem.id}</a>
		</li>
		)
	}
});

var SessionsList = React.createClass({
	render: function() {
		var displayedSessions = this.props.sessions.map((session) =>{
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
})

var TrainingSession = React.createClass({
	render: function() {
		var trainingSessionItem = this.props.trainingSessionItem;
		return (
		<li>
			<a href={"/training_sessions/" + trainingSessionItem.date}>{trainingSessionItem.date}</a>
		</li>
		)
	}
});

var FilteredTrainingSessionsList = React.createClass({
	render: function() {
		var displayedSessions = this.props.training_sessions.map((training_session) =>{
			return <TrainingSession key={training_session.main_session_id} trainingSessionItem={training_session} />;
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

var MainContent = React.createClass({
	render: function() {
		return (
		//{/* conditional... !!!!!!!!!!! */}
		<div className="main-content-with-search-box">
		{/*<EditProfileForm/>*/}
		{/*<Chart/>*/}
		{/*<UserInfo />*/}
		{/*<FilteredUsersList  users={this.props.users}/>*/}
		{/*<FilteredTrainingSessionsList  training_sessions={this.props.training_sessions}/>*/}
		<div className="calendar">
		{/*<SelectableDay />*/}
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
		{/*<MonthPicker/>*/}
		{/*<SearchBox/>*/}
		{/*<ChartDataPicker/>*/}
        <MainContent users={this.props.users} training_sessions={this.props.training_sessions} sessions={this.props.sessions}/>
		<SessionsList  sessions={this.props.sessions}/>
		
		  <Footer />
		  </div>
	  );
  }
});

export default GymProgressLogger;
