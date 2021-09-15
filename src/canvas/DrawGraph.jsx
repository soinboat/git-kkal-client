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
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.arrayOf(PropTypes.string),
      ]),
    ),
  ).isRequired,
  maxPipeCount: PropTypes.number.isRequired,
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
  clicked: PropTypes.number.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};
