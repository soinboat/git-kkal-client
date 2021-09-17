import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DrawGraph from '../canvas/DrawGraph';
import Description from './commitDetails/Description';

import theme from '../context/theme';

export default function Graph2d({ repoData, targetCommit, handleNodeClick }) {
  if (!repoData.repoName) {
    return <div>데이터없음</div>;
  }

  const { logList, lineList, maxPipeCount } = repoData;
  const limitedLogList = logList.slice(0, theme.limit.maxNodeCount);
  const limitedLineList = lineList.slice(0, theme.limit.maxNodeCount);

  const onClickHandler = (index, hash) => {
    handleNodeClick(hash);
  };

  return (
    <GraphWrapper>
      <DrawGraph
        logList={limitedLogList}
        lineList={limitedLineList.flat()}
        targetCommit={targetCommit}
        maxPipeCount={maxPipeCount}
        onClickHandler={onClickHandler}
      />
      <Description
        logList={limitedLogList}
        targetCommit={targetCommit}
        onClickHandler={onClickHandler}
      />
    </GraphWrapper>
  );
}

const GraphWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  overflow: scroll;
`;

Graph2d.defaultProps = {
  repoData: {
    repoName: '',
    logList: [
      {
        message: 'Message',
      },
    ],
  },
  targetCommit: '',
};

Graph2d.propTypes = {
  repoData: PropTypes.shape({
    repoName: PropTypes.string.isRequired,
    maxPipeCount: PropTypes.number.isRequired,
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
  targetCommit: PropTypes.string,
  handleNodeClick: PropTypes.func.isRequired,
};
