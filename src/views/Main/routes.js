import React from 'react'
import {Route, IndexRedirect} from 'react-router'
import AuthService from 'utils/AuthService'
import Container from './Container'
import Home from './Home/Home'
import Login from './Login/Login'
import Autosuggest from 'react-autosuggest';
import ExerciseNamePick from './Home/ExerciseNamePick';
import EditProfileForm from './Home/EditProfileForm';
import TrainingSessionsList from './Home/TrainingSessionsList';
import MuscleGroupSessionList from './Home/MuscleGroupSessionList';
import ExerciseUnitList from './Home/ExerciseUnitList';
import MuscleList from './Home/MuscleList';
import ExerciseList from './Home/ExerciseList';
import ExerciseInfo from './Home/ExerciseInfo';

const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);



// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} onEnter={requireAuth} />
      <Route path="login" component={Login} />
	  <Route path="users/:id" component={TrainingSessionsList} onEnter={requireAuth} />
	  <Route path="trainingsessions/:id" component={MuscleGroupSessionList} onEnter={requireAuth}/>
	  <Route path="musclegroupsessions/:id" component={ExerciseUnitList} onEnter={requireAuth}/>
	  <Route path="muscles" component={MuscleList} />
	  <Route path="musclegroupexercises/:id" component={ExerciseList} />
	  <Route path="exerciseInfo/:id" component={ExerciseInfo}/>
	  <Route path="charts/:id" component={ExerciseNamePick} onEnter={requireAuth}/>
    </Route>
  )
}

export default makeMainRoutes
