import React from 'react';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

import NavBar from '../components/layouts/NavBar';
import BranchBar from '../components/layouts/BranchBar';
import ContentBox from '../components/layouts/ContentBox';
import { BodyWrapper, HeaderWrapper } from '../components/styles';

import UrlForm from '../components/UrlForm';

export default function Landing({ repoData, handleRepoUrlSubmit }) {
  if (repoData) {
    return <Redirect to="/repository" />;
  }

  return (
    <>
      <HeaderWrapper>
        <NavBar />
      </HeaderWrapper>
      <BodyWrapper>
        <BranchBar>Branch bar</BranchBar>
        <ContentBox>
          <UrlForm handleRepoUrlSubmit={handleRepoUrlSubmit} />
        </ContentBox>
      </BodyWrapper>
    </>
  );
}

Landing.defaultProps = {
  repoData: {
    repoName: 'repoName',
    logList: [
      {
        message: 'Message',
      },
    ],
  },
};

Landing.propTypes = {
  repoData: PropTypes.shape({
    repoName: PropTypes.string.isRequired,
    logList: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.bool,
          PropTypes.arrayOf(PropTypes.string),
        ]),
      ),
    ).isRequired,
  }),
  handleRepoUrlSubmit: PropTypes.func.isRequired,
};
