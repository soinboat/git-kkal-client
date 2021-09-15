import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DrawGraph from '../canvas/DrawGraph';
import Description from './commitDetails/Description';
import getWindowDimensions from '../hooks/useWindowDimensions';

import theme from '../context/theme';
import { initColorList } from '../utils/graphDraw';

export default function Graph2d({ repoData, handleNodeClick }) {
  if (!repoData.repoName) {
    return <div>데이터없음</div>;
  }

  const { logList, lineList, maxPipeCount } = repoData;
  const limitedLogList = logList.slice(0, theme.limit.maxNodeCount);
  const limitedLineList = lineList.slice(0, theme.limit.maxNodeCount);

  const [colorList, setColorList] = useState(() => {
    const newColorList = initColorList(limitedLogList, theme.border.black);
    newColorList[0] = theme.background.transparentAqua;

    return newColorList;
  });

  const [clicked, setClicked] = useState(0);
  const { width } = getWindowDimensions();

  const handleCommitClick = (index) => {
    const newColorList = initColorList(limitedLogList, theme.border.black);

    newColorList[index] = theme.background.aqua;
    setColorList(newColorList);
  };

  const onClickHandler = (index, hash) => {
    setClicked(index);
    handleCommitClick(index);
    handleNodeClick(hash);
  };

  const responsiveWidth =
    width - (theme.size.branchBarWidth + theme.size.diffBarWidth) <
    theme.size.contentBoxMinWidth
      ? theme.size.contentBoxMinWidth
      : width - (theme.size.branchBarWidth + theme.size.diffBarWidth);

  return (
    <GraphWrapper width={responsiveWidth}>
      <DrawGraph
        logList={limitedLogList}
        lineList={limitedLineList}
        clicked={clicked}
        maxPipeCount={maxPipeCount}
        onClickHandler={onClickHandler}
      />
      <Description
        logList={limitedLogList}
        colorList={colorList}
        onClickHandler={onClickHandler}
      />
    </GraphWrapper>
  );
}

const GraphWrapper = styled.div`
  width: ${({ width }) => `${width}px`};
  display: flex;
  height: 100%;
  overflow-y: scroll;
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
        PropTypes.objectOf(
          PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
          ]),
        ),
      ),
    ).isRequired,
  }),
  handleNodeClick: PropTypes.func.isRequired,
};
