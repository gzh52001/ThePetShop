import React from 'react';
// import 'antd/dist/antd.css';
import {withRouter} from 'react-router-dom';
import 'lib-flexible';
import 'antd-mobile/dist/antd-mobile.css';

// components
import AppHead from './components/AppHead';
import AppMain from './components/AppMain';
import AppFooter from './components/AppFooter';


function App() {
  return (
    <div className="App">
      <AppHead />
      <AppFooter />
    </div>
  );
}

export default App;
