import React from 'react';
// import 'antd/dist/antd.css';
import {withRouter,Router} from 'react-router-dom';
import 'lib-flexible';
import 'antd-mobile/dist/antd-mobile.css';
import '@/assets/icon/iconfont.css'

// components
import AppHead from './components/AppHead';
import AppMain from './components/AppMain';
import AppFooter from './components/AppFooter';


function App() {
  return (
    <div className="App">
      {/* <AppHead /> */}
      <AppMain />
      <AppFooter />
    </div>
  );
}
App = withRouter(App)
export default App;
