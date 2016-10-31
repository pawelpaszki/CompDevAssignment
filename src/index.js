import React from 'react';
import ReactDOM from 'react-dom';
import GymProgressLogger from './App';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Users from './Data';
import TrainingSessions from './training_test';

ReactDOM.render(
  <GymProgressLogger users={Users} training_sessions={TrainingSessions} />,
  document.getElementById('root')
);
