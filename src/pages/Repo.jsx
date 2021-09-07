import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavBar from '../components/layouts/NavBar';
import BranchBar from '../components/layouts/BranchBar';
import ContentBox from '../components/layouts/ContentBox';
import CommitBar from '../components/layouts/CommitBar';

import Button from '../components/Button';
import { BodyWrapper, HeaderWrapper } from '../components/styles';
import getBranchList from '../utils';
import BranchList from '../components/BranchList';

export default function Repo({ repoData }) {
  if (!repoData) {
    return <Redirect to="/" />;
  }

  const branchList = getBranchList(repoData);

  return (
    <>
      <HeaderWrapper>
        <NavBar>
          <Button>test button</Button>
          <Button primary>test button</Button>
        </NavBar>
      </HeaderWrapper>
      <BodyWrapper>
        <BranchBar>
          <BranchList branchList={branchList} />
        </BranchBar>
        <ContentBox>Content Box</ContentBox>
        <CommitBar>Commit bar</CommitBar>
      </BodyWrapper>
    </>
  );
}

Repo.defaultProps = {
  repoData: {
    repoName: 'repoName',
    branchList: [
      {
        message: 'Message',
      },
    ],
  },
};

Repo.propTypes = {
  repoData: PropTypes.shape({
    repoName: PropTypes.string.isRequired,
    branchList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
      .isRequired,
  }),
};
