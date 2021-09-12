import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import loadable from '@loadable/component';
import { fetchRepoData } from './api/git';
import { filterGitExtension } from './utils/git';

const Landing = loadable(() => import('./pages/Landing'));
const Repo = loadable(() => import('./pages/Repo/index'));

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [repoData, setRepoData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const handleRepoUrlSubmit = async (ev, inputUrl) => {
    ev.preventDefault();
    setIsLoading(true);

    if (!inputUrl) {
      alert('Please input repository URL');

      setIsLoading(false);
      return;
    }

    const fetchedRepoData = await fetchRepoData(inputUrl);

    setRepoUrl(filterGitExtension(inputUrl));
    setRepoData(fetchedRepoData);
    setIsLoading(false);
  };

  return (
    <Switch>
      <Route exact path="/">
        <Landing
          isLoading={isLoading}
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
