import React, { memo } from 'react';
import { Stage } from '@inlet/react-pixi';
import PropTypes from 'prop-types';

import DrawNode from './DrawNode';
import DrawLine from './DrawLine';
import DrawButtonList from './DrawButtonList';

import theme from '../context/theme';

function DrawGraph({
  logList,
  lineList,
  maxPipeCount,
  clicked,
  onClickHandler,
}) {
  return (
    <Stage
      width={(maxPipeCount + 1) * theme.size.graph2dNodeSpacing}
      height={theme.limit.maxNodeCount * theme.size.graph2dNodeSpacing}
      options={{ antialias: true }}
    >
      <DrawButtonList
        logList={logList}
        clicked={clicked}
        onClickHandler={onClickHandler}
      />
      <DrawLine lineList={lineList} />
      <DrawNode logList={logList} />
    </Stage>
  );
}

export default memo(DrawGraph);

DrawGraph.propTypes = {
  logList: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      author: PropTypes.string,
      authoredTime: PropTypes.string,
      committer: PropTypes.string,
      committedTime: PropTypes.string,
      parents: PropTypes.arrayOf(PropTypes.string),
      hash: PropTypes.string,
      branchNames: PropTypes.arrayOf(PropTypes.string),
      branchName2: PropTypes.string,
      head: PropTypes.bool,
      index: PropTypes.number,
      position: PropTypes.number,
      color: PropTypes.string,
    }),
  ).isRequired,
  maxPipeCount: PropTypes.number.isRequired,
  lineList: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
      }),
    ),
  ).isRequired,
  clicked: PropTypes.number.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};
