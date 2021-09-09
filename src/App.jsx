import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import loadable from '@loadable/component';
import { fetchRepoData } from './api/git';

const Landing = loadable(() => import('./pages/Landing'));
const Repo = loadable(() => import('./pages/Repo'));

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [repoData, setRepoData] = useState(null);

  const handleRepoUrlSubmit = async (ev, inputUrl) => {
    ev.preventDefault();

    if (!inputUrl) {
      alert('Please input repository URL');
      return;
    }

    const fetchedRepoData = await fetchRepoData(inputUrl);

    setRepoUrl(inputUrl);
    setRepoData(fetchedRepoData);
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
        <Repo repoUrl={repoUrl} repoData={repoData} />
      </Route>
    </Switch>
  );
}

export default App;
