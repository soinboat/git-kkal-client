import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import fetchRepoData from './api/git';

const Landing = loadable(() => import('./pages/Landing'));
const Repo = loadable(() => import('./pages/Repo'));

function App() {
  const [repoData, setRepoData] = useState(null);

  const handleRepoUrlSubmit = async (ev, repoUrl) => {
    ev.preventDefault();

    const data = await fetchRepoData(repoUrl);

    setRepoData(data);
  };

  return (
    <Switch>
      <Route exact path="/">
        <Landing
          repoData={repoData}
          handleRepoUrlSubmit={handleRepoUrlSubmit}
        />
      </Route>
      <Route path="/repository">
        <Repo repoData={repoData} />
      </Route>
    </Switch>
  );
}

export default App;
