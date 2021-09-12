import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Graphics } from '@inlet/react-pixi';
import convertColor from '../utils/convertColor';

export default function DrawLine({ lineList }) {
  const draw = useCallback(
    (graph) => {
      // const SLOPE = 20;
      const calcPosition = (linePosition) => {
        const modifiedPosition = {
          x: linePosition[0] + 50,
          y: linePosition[1] + 100,
        };

        return modifiedPosition;
      };
      graph.clear();

      lineList.forEach((line) => {
        const color = convertColor(line.color);
        const firstPoint = line.points.shift();
        const firstPosition = calcPosition(firstPoint);
        graph.lineStyle(2, color);
        graph.moveTo(firstPosition.x, firstPosition.y);

        line.points.forEach((point) => {
          const pointPosition = calcPosition(point);
          graph.lineTo(pointPosition.x, pointPosition.y);
        });
      });
      graph.endFill();
    },
    [lineList],
  );

  return <Graphics draw={draw} />;
}

DrawLine.propTypes = {
  lineList: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    ),
  ).isRequired,
};
