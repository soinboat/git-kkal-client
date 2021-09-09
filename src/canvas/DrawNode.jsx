/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import React from 'react';
import { Graphics } from '@inlet/react-pixi';

import convertColor from '../utils/convertColor';

export default function DrawNode({ log, index }) {
  const logNode = (node) => {
    const circleSize = 10;
    const circleColor = convertColor(log.color);
    node.beginFill(circleColor);
    node.drawCircle(log.position * 100, index * 50 + 100, circleSize);
    node.interactive = true;
    node.on('mousedown', () => {
      console.log('clicked', log.hash);
    });
    node.endFill();
  };

  return <Graphics draw={logNode} />;
}
