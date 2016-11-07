import React from 'react';
import ReactDOM from 'react-dom';
import GymProgressLogger from './App';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import Autosuggest from 'react-autosuggest';
import SelectableDay from './SelectableDay';
import ExerciseNamePick from './ExerciseNamePick';
import EditProfileForm from './EditProfileForm';
import TrainingSessionsList from './TrainingSessionsList';
import MuscleGroupSessionList from './MuscleGroupSessionList';
import ExerciseUnitList from './ExerciseUnitList';
import MuscleList from './MuscleList';
import ExerciseList from './ExerciseList';
import ExerciseInfo from './ExerciseInfo';
import './App.css';


var App = React.createClass({
  render : function() {
	return (
	  <div>
	    <Navbar />
        <Sidebar />
		{this.props.children}
		<Footer />
	  </div>
	)
  }
});

ReactDOM.render( (
  <Router history={browserHistory} >
	<Route path="/" component={App}>
	   <IndexRoute component={GymProgressLogger}/>
	   <Route path="users/:id" component={TrainingSessionsList} />
	   <Route path="trainingsessions/:id" component={MuscleGroupSessionList} />
	   <Route path="musclegroupsessions/:id" component={ExerciseUnitList} />
	   <Route path="muscles" component={MuscleList} />
	   <Route path="musclegroupexercises/:id" component={ExerciseList} />
	   <Route path="exerciseInfo/:id" component={ExerciseInfo}/>
	   <Route path="charts/:id" component={ExerciseNamePick}/>
	   <Route path="calendar/:id" component={SelectableDay}/>
	</Route>
  </Router>
),
  document.getElementById('root')
);
