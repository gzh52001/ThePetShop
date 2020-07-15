import React from 'react';
import { Route, withRouter,  Switch } from 'react-router-dom'

import Main from '@/components/Main'

import "@/assets/css/reset.css"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Main}></Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
