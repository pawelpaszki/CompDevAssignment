import React from 'react';
import ReactDOM from 'react-dom';
import GymProgressLogger from './App';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Users from './Data';
import Tsessions from './TrainingSessions';
import Msessions from './MuscleSession';

ReactDOM.render(
  <GymProgressLogger users={Users} tsessions={Tsessions} msessions={Msessions}/>,
  document.getElementById('root')
);
