import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

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

  const [targetBranch, setTargetBranch] = useState(null);
  const [targetCommit, setTargetCommit] = useState(repoData.logList[0].hash);
  const [targetDiffList, setTargetDiffList] = useState(null);
  const [targetDiffFile, setTargetDiffFile] = useState(null);
  const [is2dGraphMode, setIs2dGraphMode] = useState(true);

  const branchList = useMemo(() => getBranchList(repoData), [repoData]);

  const handleBranchClick = useCallback(
    (branch) => {
      setTargetBranch(branch);
    },
    [setTargetBranch],
  );

  const handleNodeClick = useCallback(
    (hash) => {
      setTargetCommit(hash);
    },
    [setTargetCommit],
  );

  const handleDiffClick = useCallback(
    (file) => {
      setTargetDiffFile(file);
    },
    [setTargetDiffFile],
  );

  const handleGraphMode = useCallback(
    (event) => {
      const { name } = event.target;
      const mode = name === UI.TWO_DIMENSION;

      setIs2dGraphMode(mode);
    },
    [setIs2dGraphMode],
  );

  useEffect(() => {
    if (!targetBranch) {
      setTargetCommit(null);
    } else {
      setTargetCommit(targetBranch.hash);
    }
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
    if (!targetDiffList) {
      setTargetDiffFile(null);
    } else {
      setTargetDiffFile(targetDiffList[0]);
    }
  }, [targetDiffList]);

  return (
    <>
      <HeaderWrapper>
        <NavBar>
          <Wrapper>
            <div>
              <Span>Repository: {repoData.repoName}</Span>
            </div>
            <div>
              <ButtonWrapper>
                <Button name={UI.TWO_DIMENSION} onClick={handleGraphMode}>
                  {UI.TWO_DIMENSION}
                </Button>
                <Button name={UI.THREE_DIMENSION} onClick={handleGraphMode}>
                  {UI.THREE_DIMENSION}
                </Button>
              </ButtonWrapper>
            </div>
            <div />
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
              <DiffList
                targetDiffList={targetDiffList}
                handleDiffClick={handleDiffClick}
              />
            </DiffBar>
          </Route>
        </Switch>
      </BodyWrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background-color: ${({ theme: { background } }) => background.black};
  color: ${({ theme: { font } }) => font.color.grey};

  div {
    flex: 1;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Span = styled.span`
  display: inline-block;
  flex: 1;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #ffffff43;
  background-color: #ffffff5a;
  color: white;
  text-align: center;
  text-decoration: none;
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
    lineList: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          color: PropTypes.string.isRequired,
          points: PropTypes.arrayOf(
            PropTypes.arrayOf(PropTypes.number.isRequired),
          ),
        }),
      ),
    ),
  }),
};
