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
import Login from '@/views/Login';
import Reg from '@/views/Reg';

@withRouter
class App extends Component {
  render() {
    // console.log(this.props);
    const { location: { pathname } } = this.props;
    return (
      <div className="App">
        {
          pathname === '/login' || pathname ==='/reg' ? (
            <>
              <Route path='/login' component={Login} />
              <Route path='/reg' component={Reg} />
            </>
          ) : (
            <>
              <AppMain />
              <AppFooter />
            </>
          )
        }
      </div>
    );
  }
}
App = withRouter(App)
export default App;
