import React, { memo } from 'react';
import { Stage } from '@inlet/react-pixi';
import PropTypes from 'prop-types';

import DrawNode from './DrawNode';
import DrawLine from './DrawLine';
import DrawButtonList from './DrawButtonList';

function DrawGraph({ logList, lineList, clicked, onClickHandler }) {
  return (
    <Stage
      width={300}
      height={logList.length * 50}
      options={{ antialias: true }}
    >
      <DrawButtonList
        lineList={lineList}
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
  lineList: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
      ]),
    ),
  ).isRequired,
  clicked: PropTypes.number.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};
