import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavBar from '../components/layouts/NavBar';
import BranchBar from '../components/layouts/BranchBar';
import ContentBox from '../components/layouts/ContentBox';
import DiffBar from '../components/layouts/DiffBar';

import { BodyWrapper, HeaderWrapper } from '../components/styles';
import Button from '../components/Button';
import BranchList from '../components/BranchList';
import Graph2d from '../components/Graph2d';
import DiffList from '../components/DiffList';

import { fetchDiff } from '../api/git';
import { getBranchList } from '../utils/git';
import UI from '../constants/ui';

export default function Repo({ repoUrl, repoData }) {
  if (!repoData) {
    return <Redirect to="/" />;
  }

  const [targetCommit, setTargetCommit] = useState(repoData?.logList[0].hash);
  const [targetDiffList, setTargetDiffList] = useState(null);
  const branchList = getBranchList(repoData);

  useEffect(() => {
    (async () => {
      if (repoUrl && targetCommit) {
        const diffList = await fetchDiff(repoUrl, targetCommit);

        setTargetDiffList(diffList.changedFileList);
      }
    })();
  }, [targetCommit]);

  const handleNodeClick = (hash) => {
    setTargetCommit(hash);
  };

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
        <ContentBox>
          <Graph2d repoData={repoData} handleNodeClick={handleNodeClick} />
        </ContentBox>
        <DiffBar>
          <DiffList targetDiffList={targetDiffList} />
        </DiffBar>
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
  repoUrl: 'repoUrl',
  repoData: {
    repoName: 'repoName',
    logList: [
      {
        message: 'Message',
        hash: 'hash',
      },
    ],
  },
};

Repo.propTypes = {
  repoUrl: PropTypes.string,
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
};
