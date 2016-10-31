import React from 'react';
import ReactDOM from 'react-dom';
import GymProgressLogger from './App';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Users from './Data';
import TrainingSessions from './TrainingSessions';
import MuscleSessions from './MuscleSession';

ReactDOM.render(
  <GymProgressLogger users={Users} training_sessions={TrainingSessions} sessions={MuscleSessions}/>,
  document.getElementById('root')
);
