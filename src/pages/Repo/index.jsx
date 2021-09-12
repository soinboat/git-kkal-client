import React, { useEffect, useState } from 'react';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';

import loadable from '@loadable/component';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavBar from '../../components/layouts/NavBar';
import BranchBar from '../../components/layouts/BranchBar';
import ContentBox from '../../components/layouts/ContentBox';
import DiffBar from '../../components/layouts/DiffBar';

import { BodyWrapper, HeaderWrapper } from '../../components/styles';
import Button from '../../components/Button';
import BranchList from '../../components/BranchList';
import Graph2d from '../../components/Graph2d';
import Graph3d from '../../components/Graph3d';
import DiffList from '../../components/DiffList';

import { fetchDiff } from '../../api/git';
import { getBranchList } from '../../utils/git';
import UI from '../../constants/ui';

const Diff = loadable(() => import('./Diff'));

export default function Repo({ repoUrl, repoData }) {
  if (!repoData) {
    return <Redirect to="/" />;
  }

  const history = useHistory();

  const [targetBranch, setTargetBranch] = useState(null);
  const [targetCommit, setTargetCommit] = useState(repoData?.logList[0].hash);
  const [targetDiffList, setTargetDiffList] = useState(null);
  const [targetDiffFile, setTargetDiffFile] = useState(null);
  const [is2dGraphMode, setIs2dGraphMode] = useState(true);

  const branchList = getBranchList(repoData);

  const handleBranchClick = (branch) => {
    setTargetBranch(branch);
  };

  const handleNodeClick = (hash) => {
    setTargetCommit(hash);
  };

  const handleDiffClick = (file) => {
    setTargetDiffFile(file);

    history.push('/repository/diff');
  };

  const handleGraphMode = (event) => {
    const { id } = event.target;
    const mode = id === UI.TWO_DIMENSION;

    setIs2dGraphMode(mode);
  };

  useEffect(() => {
    setTargetCommit(targetBranch?.hash);
  }, [targetBranch]);

  useEffect(() => {
    (async () => {
      if (repoUrl && targetCommit) {
        const diffList = await fetchDiff(repoUrl, targetCommit);

        setTargetDiffList(diffList.changedFileList);
      }
    })();
  }, [targetCommit]);

  useEffect(() => {
    setTargetDiffFile(targetDiffList?.[0]);
  }, [targetDiffList]);

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
            <Link exact="true" to="/repository">
              go to repo
            </Link>
            <Link to="/repository/diff">go to diff</Link>
          </Wrapper>
        </NavBar>
      </HeaderWrapper>
      <BodyWrapper>
        <Switch>
          <Route exact path="/repository">
            <BranchBar>
              <BranchList
                branchList={branchList}
                handleBranchClick={handleBranchClick}
              />
            </BranchBar>
            <ContentBox>
              {is2dGraphMode ? (
                <Graph2d
                  repoData={repoData}
                  handleNodeClick={handleNodeClick}
                />
              ) : (
                <Graph3d
                  repoData={repoData}
                  handleNodeClick={handleNodeClick}
                />
              )}
            </ContentBox>
            <DiffBar>
              <DiffList
                targetDiffList={targetDiffList}
                handleDiffClick={handleDiffClick}
              />
            </DiffBar>
          </Route>
          <Route path="/repository/diff">
            <ContentBox>
              <Diff targetDiff={targetDiffFile} />
            </ContentBox>
            <DiffBar>
              <DiffList />
            </DiffBar>
          </Route>
        </Switch>
      </BodyWrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${({ theme: { background } }) => background.black};
  color: ${({ theme: { font } }) => font.color.grey};
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
