import React from 'react'
import {Route, IndexRedirect} from 'react-router'
import AuthService from 'utils/AuthService'
import Container from './Container'
import Home from './Home/Home'
import Login from './Login/Login'
import Autosuggest from 'react-autosuggest';
import ChartGenerator from './Home/ChartGenerator';
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
    replace({ pathname: '/api/login' })
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="api/users" />
      <Route path="api/users" component={Home} onEnter={requireAuth} />
      <Route path="api/login" component={Login} />
      <Route path="api/users/:user_id/tsessions" component={TrainingSessionsList} onEnter={requireAuth} />
      <Route path="api/users/:user_id/tsessions/:tsession_id/msessions" component={MuscleGroupSessionList} onEnter={requireAuth}/>
      <Route path="api/users/:user_id/tsessions/:tsession_id/msessions/:msession_id/exerciseunits" component={ExerciseUnitList} onEnter={requireAuth}/>
      <Route path="api/muscles" component={MuscleList} />
      <Route path="api/muscles/:muscle_id/exercises" component={ExerciseList} />
      <Route path="api/exerciseInfo/:id" component={ExerciseInfo}/>
      <Route path="api/users/:user_id/charts" component={ChartGenerator} onEnter={requireAuth}/>
    </Route>
  )
}

export default makeMainRoutes
