import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Graphics } from '@inlet/react-pixi';
import convertColor from '../utils/convertColor';
// import theme from '../context/theme';

export default function DrawLine({ lineList }) {
  const drawLine = useCallback(
    (graph) => {
      const calcPosition = (linePosition) => {
        const modifiedPosition = {
          x: linePosition[0] + 100,
          y: linePosition[1] + 25,
        };

        return modifiedPosition;
      };

      graph.clear();
      lineList.forEach((lines) => {
        lines.forEach((line) => {
          const color = convertColor(line.color);
          const points = [...line.points];
          const firstPoint = points.shift();
          const firstPosition = calcPosition(firstPoint);

          graph.lineStyle(2, color);
          graph.moveTo(firstPosition.x, firstPosition.y);

          line.points.forEach((point) => {
            const pointPosition = calcPosition(point);
            graph.lineTo(pointPosition.x, pointPosition.y);
          });
        });
      });

      graph.endFill();
    },
    [lineList],
  );

  return <Graphics draw={drawLine} />;
}

DrawLine.propTypes = {
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
};
