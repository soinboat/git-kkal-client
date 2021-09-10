import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavBar from '../components/layouts/NavBar';
import BranchBar from '../components/layouts/BranchBar';
import ContentBox from '../components/layouts/ContentBox';
import DiffBar from '../components/layouts/DiffBar';
import BranchList from '../components/BranchList';
import Button from '../components/Button';

import Graph2d from '../components/Graph2d';
import Graph3d from '../components/Graph3d';

import { BodyWrapper, HeaderWrapper } from '../components/styles';

import getBranchList from '../utils';
import UI from '../constants/ui';
import DiffList from '../components/DiffList';
import { fetchDiff } from '../api/git';

export default function Repo({ repoUrl, repoData }) {
  if (!repoData) {
    return <Redirect to="/" />;
  }

  const [targetCommit, setTargetCommit] = useState(repoData?.logList[0].hash);
  const [targetDiffList, setTargetDiffList] = useState(null);
  const [is2dGraphMode, setIs2dGraphMode] = useState(true);

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

  const handleGraphMode = (event) => {
    const { id } = event.target;
    const mode = id === UI.TWO_DIMENSION;

    setIs2dGraphMode(mode);
  };

  return (
    <>
      <HeaderWrapper>
        <NavBar>
          <Wrapper>
            <Span>Repository: {repoData.repoName}</Span>
            <Span>Branch name:</Span>
            <Button id={UI.TWO_DIMENSION} onClick={handleGraphMode}>
              {UI.TWO_DIMENSION}
            </Button>
            <Button id={UI.THREE_DIMENSION} onClick={handleGraphMode}>
              {UI.THREE_DIMENSION}
            </Button>
          </Wrapper>
        </NavBar>
      </HeaderWrapper>
      <BodyWrapper>
        <BranchBar>
          <BranchList branchList={branchList} />
        </BranchBar>
        <ContentBox>
          {is2dGraphMode ? (
            <Graph2d repoData={repoData} handleNodeClick={handleNodeClick} />
          ) : (
            <Graph3d repoData={repoData} handleNodeClick={handleNodeClick} />
          )}
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
