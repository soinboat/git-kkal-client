import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DrawGraph from '../canvas/DrawGraph';
import Description from './Description';
import getWindowDimensions from '../hooks/useWindowDimensions';

import { CLICKED_COLOR, BACKGROUND_COLOR } from '../constants/graph2dColor';
import {
  BRANCH_BAR_WIDTH,
  DIFF_BAR_WIDTH,
  CONTENT_BOX_MIN_WIDTH,
} from '../constants/size';

export default function Graph2d({ repoData, handleNodeClick }) {
  if (!repoData.repoName || !repoData.logList) {
    return <div>데이터없음</div>;
  }

  const { logList, lineList } = repoData;
  const [colorList, setColorList] = useState(() => {
    const newColorList = new Array(logList.length).fill(BACKGROUND_COLOR);
    newColorList[0] = CLICKED_COLOR;
    return newColorList;
  });

  const [clicked, setClicked] = useState(0);
  const { width } = getWindowDimensions();

  const handleCommitClick = (index) => {
    const newColorList = new Array(repoData.logList.length).fill(
      BACKGROUND_COLOR,
    );
    newColorList[index] = CLICKED_COLOR;
    setColorList(newColorList);
  };

  const onClickHandler = (index, hash) => {
    setClicked(index);
    handleCommitClick(index);
    handleNodeClick(hash);
  };

  return (
    <GraphWrapper
      style={{
        width:
          width - (BRANCH_BAR_WIDTH + DIFF_BAR_WIDTH) < CONTENT_BOX_MIN_WIDTH
            ? CONTENT_BOX_MIN_WIDTH
            : width - (BRANCH_BAR_WIDTH + DIFF_BAR_WIDTH),
      }}
    >
      <Graph>
        <DrawGraph
          logList={logList}
          lineList={lineList}
          clicked={clicked}
          onClickHandler={onClickHandler}
        />
      </Graph>
      <Description
        logList={logList}
        colorList={colorList}
        onClickHandler={onClickHandler}
      />
    </GraphWrapper>
  );
}

const GraphWrapper = styled.div`
  display: flex;
  height: 100%;
  overflow-y: scroll;
`;

const Graph = styled.div`
  display: inline;
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
};

Graph2d.propTypes = {
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
    lineList: PropTypes.arrayOf([
      PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.arrayOf(PropTypes.Number),
        ]),
      ),
    ]),
  }),
  handleNodeClick: PropTypes.func.isRequired,
};
