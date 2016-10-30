import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import BarChart from 'react-bar-chart';
import './App.css';

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
        <div className="center">
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
 
const margin = {top: 20, right: 20, bottom: 30, left: 40};

const Chart = React.createClass({
  
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

var SearchBox = React.createClass({
  render: function(){
    return (
      <div className="search-box">
        <input type="text" placeholder="Search" />
        Sort by:
        <select>
          <option value="name">Alphabetical</option>
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
		 <table className="table table-hover">
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




var MainContent = React.createClass({
	render: function() {
		return (
		//{/* conditional... !!!!!!!!!!! */}
		<div className="main-content-without-search-box">
		<Chart/>
		{/*<UserInfo />*/}
		{/*<FilteredUsersList  users={this.props.users}/>*/}
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
        <MainContent users={this.props.users}/>
		
		  <Footer />
		  </div>
	  );
  }
});

export default GymProgressLogger;
