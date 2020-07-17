import React, { Component } from 'react';
// import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import 'lib-flexible';
import 'antd-mobile/dist/antd-mobile.css';
import '@/assets/icon/iconfont.css'

// components
import Layout from '@/views/Layout';

@withRouter
class App extends Component {
  render() {
    return (
      <div className="App">
          <Layout/>
      </div>
    );
  }
}
App = withRouter(App)
export default App;
