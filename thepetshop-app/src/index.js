import React from 'react';
import {HashRouter,BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import './assets/reset.css';
import App from './App';

const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter

ReactDOM.render(
    <Router>
      <App />
    </Router>,
  document.getElementById('root')
);
