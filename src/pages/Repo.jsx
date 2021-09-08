import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavBar from '../components/layouts/NavBar';
import BranchBar from '../components/layouts/BranchBar';
import ContentBox from '../components/layouts/ContentBox';
import CommitBar from '../components/layouts/CommitBar';

import Button from '../components/Button';
import { BodyWrapper, HeaderWrapper } from '../components/styles';
import getBranchList from '../utils';
import BranchList from '../components/BranchList';
import UI from '../constants/ui';

export default function Repo({ repoData }) {
  if (!repoData) {
    return <Redirect to="/" />;
  }

  const branchList = getBranchList(repoData);

  return (
    <>
      <HeaderWrapper>
        <NavBar>
          <Wrapper>
            <Span>Repository: {repoData.repoName}</Span>
            <Span>Branch name:</Span>
            <Button>{UI.TWO_DIMENSION}</Button>
            <Button primary>{UI.THREE_DIMENSION}</Button>
          </Wrapper>
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

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${({ theme: { background } }) => background.BLACK};
  color: ${({ theme: { font } }) => font.GREY};
`;

const Span = styled.span`
  background: ${({ primary }) => (primary ? 'palevioletred' : 'white')};
  color: ${({ primary }) => (primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

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
