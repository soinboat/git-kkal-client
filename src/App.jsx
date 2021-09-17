import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import loadable from '@loadable/component';
import { ToastContainer } from 'react-toastify';

import { fetchRepoData } from './api/git';
import { filterGitExtension } from './utils/git';
import { notifyErr, notifySuccess } from './utils/notify';
import ERROR from './constants/error';

const Landing = loadable(() => import('./pages/Landing'));
const Repository = loadable(() => import('./pages/Repository/index'));

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [repoData, setRepoData] = useState(null);

  const handleRepoUrlSubmit = async (ev, inputUrl) => {
    ev.preventDefault();

    if (!inputUrl) {
      notifyErr();
      return;
    }

    try {
      const fetchedRepoData = await fetchRepoData(inputUrl);

      setRepoUrl(filterGitExtension(inputUrl));
      setRepoData(fetchedRepoData);

      notifySuccess();
    } catch (err) {
      if (err.response) {
        notifyErr(err.response.status);
      } else {
        notifyErr(ERROR.INTERNAL_SERVER_ERROR_STATUS_CODE);
      }
    }
  };

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Landing
            repoData={repoData}
            handleRepoUrlSubmit={handleRepoUrlSubmit}
          />
        </Route>
        <Route path="/repository">
          <Repository repoUrl={repoUrl} repoData={repoData} />
        </Route>
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;
