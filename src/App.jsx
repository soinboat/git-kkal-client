import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Repo from './pages/Repo';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route path="/repository">
        <Repo />
      </Route>
    </Switch>
  );
}

export default App;
