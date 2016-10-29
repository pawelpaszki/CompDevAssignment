import React from 'react';
import ReactDOM from 'react-dom';
import GymProgressLogger from './App';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Users from './Data';

ReactDOM.render(
  <GymProgressLogger users={Users} />,
  document.getElementById('root')
);
