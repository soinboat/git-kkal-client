import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Graphics } from '@inlet/react-pixi';
import convertColor from '../utils/convertColor';

export default function DrawLine({ logList }) {
  const draw = useCallback(
    (graph) => {
      const lindData = [];
      const SLOPE = 20;
      graph.clear();

      const nodePositionData = logList.map((log, index) => {
        const circlePosition = {
          x: log.position * 50,
          y: index * 50 + 100,
        };

        return circlePosition;
      });

      logList.forEach((log, index) => {
        log.parents.forEach((parent) => {
          const parentIndex = logList.findIndex(
            (targetLog) => targetLog.hash === parent,
          );

          const color =
            log.position > logList[parentIndex].position
              ? log.color
              : logList[parentIndex].color;

          lindData.push({ start: index, to: parentIndex, color });
        });
      });

      lindData.forEach((line) => {
        const startPoint = nodePositionData[line.start];
        const endPoint = nodePositionData[line.to];
        const circleColor = convertColor(line.color);
        graph.lineStyle(2, circleColor);

        if (startPoint.x > endPoint.x) {
          graph.moveTo(startPoint.x, startPoint.y);
          graph.lineTo(startPoint.x, endPoint.y - SLOPE);
          graph.moveTo(startPoint.x, endPoint.y - SLOPE);
          graph.lineTo(endPoint.x, endPoint.y);
        } else if (startPoint.x < endPoint.x) {
          graph.moveTo(startPoint.x, startPoint.y);
          graph.lineTo(endPoint.x, startPoint.y + SLOPE);
          graph.moveTo(endPoint.x, startPoint.y + SLOPE);
          graph.lineTo(endPoint.x, endPoint.y);
        } else {
          graph.moveTo(startPoint.x, startPoint.y);
          graph.lineTo(endPoint.x, endPoint.y);
        }
      });

      graph.endFill();
    },
    [logList],
  );

  return <Graphics draw={draw} />;
}

DrawLine.propTypes = {
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
