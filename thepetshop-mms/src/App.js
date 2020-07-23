import React from 'react';
import { Route, withRouter,  Switch } from 'react-router-dom'

import Main from "@/components/Main"

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
