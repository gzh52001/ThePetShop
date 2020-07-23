import React,{Suspense,lazy} from 'react';
import ReactDOM from 'react-dom';
import {Spin} from 'antd'
import { HashRouter, BrowserRouter } from 'react-router-dom';

import "@/assets/css/reset.css"
const App = lazy(()=>import("./App"))

const Router = process.env.NODE_ENV === "production" ? BrowserRouter : HashRouter;

ReactDOM.render(
  <Suspense fallback={<div className="example"><Spin /></div>}>
  <Router>
    <App />
  </Router>
  </Suspense>,
  document.getElementById('root')
);

