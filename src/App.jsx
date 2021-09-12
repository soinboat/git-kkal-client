import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import loadable from '@loadable/component';
import { ToastContainer } from 'react-toastify';

import { fetchRepoData } from './api/git';
import { filterGitExtension } from './utils/git';
import { notifyErr, notifySuccess } from './utils/notify';

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
      setIsLoading(false);

      notifyErr();
      return;
    }

    try {
      const fetchedRepoData = await fetchRepoData(inputUrl);

      setRepoUrl(filterGitExtension(inputUrl));
      setRepoData(fetchedRepoData);
      setIsLoading(false);

      notifySuccess();
    } catch (err) {
      setIsLoading(false);

      notifyErr(err.response.status);
    }
  };

  return (
    <>
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
      <ToastContainer />
    </>
  );
}

export default App;
