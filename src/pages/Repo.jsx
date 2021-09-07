import React from 'react';
import PropTypes from 'prop-types';

import NavBar from '../components/layouts/NavBar';
import BranchBar from '../components/layouts/BranchBar';
import ContentBox from '../components/layouts/ContentBox';
import CommitBar from '../components/layouts/CommitBar';

import Button from '../components/Button';
import { BodyWrapper, HeaderWrapper } from '../components/styles';

export default function Repo({ repoData }) {
  const branchList = repoData?.branchList.map(
    (branchData) => branchData.branchName2,
  );

  return (
    <>
      <HeaderWrapper>
        <NavBar>
          <Button>test button</Button>
          <Button primary>test button</Button>
        </NavBar>
      </HeaderWrapper>
      <BodyWrapper>
        <BranchBar data={branchList}>Branch bar</BranchBar>
        <ContentBox>Content Box</ContentBox>
        <CommitBar>Commit bar</CommitBar>
      </BodyWrapper>
    </>
  );
}

Repo.propTypes = {
  repoData: PropTypes.shape({
    branchList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
      .isRequired,
    repoName: PropTypes.string.isRequired,
  }).isRequired,
};
