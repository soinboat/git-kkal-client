import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Graphics } from '@inlet/react-pixi';

import convertColor from '../utils/convertColor';

export default function DrawNode({ logList }) {
  const draw = useCallback(
    (node) => {
      const circleSize = 10;
      node.clear();
      logList.forEach((log, index) => {
        const circleColor = convertColor(log.color);
        node.beginFill(circleColor);
        node.drawCircle(log.position * 50, index * 50 + 25, circleSize);
        node.endFill();
      });
    },
    [logList],
  );

  return <Graphics draw={draw} />;
}

DrawNode.propTypes = {
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
};
