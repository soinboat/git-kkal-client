import React, { useCallback } from 'react';
import { Graphics } from '@inlet/react-pixi';
import PropTypes from 'prop-types';

import convertColor from '../utils/convertColor';

export default function DrawNode({ index, log }) {
  const logNode = useCallback(
    (node) => {
      const circleSize = 10;
      const circleColor = convertColor(log.color);

      node.beginFill(circleColor);
      node.drawCircle(log.position * 100, index * 50 + 100, circleSize);
      node.interactive = true;
      node.on('mousedown', () => {
        console.log('clicked', log.hash);
      });
      node.endFill();
    },
    [log],
  );

  return <Graphics draw={logNode} />;
}

DrawNode.propTypes = {
  index: PropTypes.number.isRequired,
  log: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  ).isRequired,
};
