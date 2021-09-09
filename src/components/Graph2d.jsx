import React from 'react';
import PropTypes from 'prop-types';
import { Stage } from '@inlet/react-pixi';
import useWindowDimensions from '../hooks/useWindowDimensions';

import DrawLine from '../canvas/DrawLine';
import DrawNode from '../canvas/DrawNode';

export default function Graph2d({ repoData }) {
  if (repoData.repoName === 'repoName') {
    return <div>데이터없음</div>;
  }

  const { logList } = repoData;

  const { width, height } = useWindowDimensions();
  const STAGE_SIZE = height - 60;

  return (
    <Stage
      width={width - 467 > 200 ? width - 467 : 200}
      height={STAGE_SIZE}
      options={{ backgroundColor: 0xffffff }}
    >
      <DrawLine logList={logList} />
      {logList.map((log, index) => (
        <DrawNode key={log.hash} log={log} index={index} />
      ))}
    </Stage>
  );
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
  }),
};
