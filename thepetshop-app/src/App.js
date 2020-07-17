import React, { Component } from 'react';
// import 'antd/dist/antd.css';
import { withRouter, Route } from 'react-router-dom';
import 'lib-flexible';
import 'antd-mobile/dist/antd-mobile.css';
import '@/assets/icon/iconfont.css'

// components
// import AppHead from './components/AppHead';
import AppMain from './components/AppMain';
import AppFooter from './components/AppFooter';
import { Switch } from 'antd-mobile';
import AppLayout from './components/AppLayout';
@withRouter
class App extends Component {
  render() {
    const { location: { pathname } } = this.props;
    console.log(pathname);
    return (
      <div className="App">
        <AppLayout />
        {
          pathname=="/home"|'classify'?
          <>
            <AppMain />
            <AppFooter /> 
          </>
          : 
          null
        }
      </div>
    );
  }
}
// App = withRouter(App)
export default App;
