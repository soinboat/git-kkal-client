import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Repo from './pages/Repo';

function App() {
  const [repoData, setRepoData] = useState(null);

  const handleRepoData = (value) => {
    setRepoData(value);
  };

  return (
    <Switch>
      <Route exact path="/">
        <Landing saveRepoData={handleRepoData} />
      </Route>
      <Route path="/repository">
        <Repo repoData={repoData} />
      </Route>
    </Switch>
  );
}

export default App;
