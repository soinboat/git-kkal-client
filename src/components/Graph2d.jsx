import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Stage, Graphics } from '@inlet/react-pixi';
import useWindowDimensions from '../hooks/useWindowDimensions';

import convertColor from '../utils/convertColor';

export default function Graph2d({ repoData }) {
  if (repoData.repoName === 'repoName') {
    return <div>데이터없음</div>
  }

  const { width, height } = useWindowDimensions();
  const STAGE_SIZE = height - 60;

  const draw = useCallback((graph) => {
    const { logList } = repoData;
    const rectangle = {
      x: 0,
      y: 0,
      width,
      height: STAGE_SIZE / logList.length > 40 ? STAGE_SIZE / logList.length : 40
    }
    const rectangleColorList = [0x212121, 0x484848];
    const lindData = [];
    const nodePositionData = [];

    const CIRCLE_SIZE = 15
    const TAG_SPACE_WIDTH = 100;
    const SLOPE = 20;

    graph.clear();

    logList.forEach((log, index) => {
      graph.beginFill(rectangleColorList[index % rectangleColorList.length]);
      graph.drawRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
      graph.endFill();

      const circleColor = convertColor(log.color);
      graph.beginFill(circleColor);
      const circlePosition = {
        x: TAG_SPACE_WIDTH + rectangle.x + CIRCLE_SIZE + (log.position * 50),
        y: rectangle.y + CIRCLE_SIZE * STAGE_SIZE / 700,
      }
      graph.drawCircle(circlePosition.x, circlePosition.y, CIRCLE_SIZE);
      nodePositionData.push(circlePosition);
      rectangle.y += rectangle.height;
    })

    logList.forEach((log, index) => {
      log.parents.forEach((parent) => {
        const parentIndex = logList.findIndex((targetLog) => targetLog.hash === parent);
        const color = log.position > logList[parentIndex].position ? log.color : logList[parentIndex].color;
        lindData.push({ start: index, to: parentIndex, color });
      });
    })


    lindData.forEach((line) => {
      const startPoint = nodePositionData[line.start];
      const endPoint = nodePositionData[line.to];
      const circleColor = convertColor(line.color);
      graph.lineStyle(2, circleColor);

      if (startPoint.x > endPoint.x) {
        graph.moveTo(startPoint.x, startPoint.y);
        graph.lineTo(startPoint.x, endPoint.y - SLOPE);
        graph.moveTo(startPoint.x, endPoint.y - 20);
        graph.lineTo(endPoint.x, endPoint.y);
      } else if (startPoint.x < endPoint.x) {
        graph.moveTo(startPoint.x, startPoint.y);
        graph.lineTo(endPoint.x, startPoint.y + 20);
        graph.moveTo(endPoint.x, startPoint.y + 20);
        graph.lineTo(endPoint.x, endPoint.y);
      } else {
        graph.moveTo(startPoint.x, startPoint.y);
        graph.lineTo(endPoint.x, endPoint.y);
      }
    });
    graph.endFill();
  }, []);


  return (
    <Stage width={width - 467 > 200 ? width - 467 : 200} height={STAGE_SIZE} options={{ backgroundColor: 0xffffff }}>
      <Graphics draw={draw} />
    </Stage>
  )
}

Graph2d.defaultProps = {
  repoData: {
    repoName: 'repoName',
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
    logList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  }),
};
