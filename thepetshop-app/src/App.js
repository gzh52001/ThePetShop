import React, { Component } from 'react';
// import 'antd/dist/antd.css';
import { withRouter, Route } from 'react-router-dom';
import 'lib-flexible';
import 'antd-mobile/dist/antd-mobile.css';

// components
import AppHead from './components/AppHead';
import AppFooter from './components/AppFooter';
import Login from '@/views/Login';

@withRouter
class App extends Component {
  render() {
    // console.log(this.props);
    const { location: { pathname } } = this.props
    return (
      <div className="App">
        {
          pathname === '/login' || '/reg' ? (
            <>
              <Route path='/login' component={Login} />
            </>
          ) : (
            <>
              <AppHead />
              <AppFooter />
            </>
          )
        }
      </div>
    );
  }
}

export default App;
