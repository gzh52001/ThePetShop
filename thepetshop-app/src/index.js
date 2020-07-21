import React from 'react';
import {HashRouter,BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom';
import './assets/reset.css';
import {Provider} from 'react-redux';
import store from '@/store';
import App from './App';

const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
