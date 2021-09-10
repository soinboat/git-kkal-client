import React from 'react';
import PropTypes from 'prop-types';
import { Stage } from '@inlet/react-pixi';
import styled from 'styled-components';

import useWindowDimensions from '../hooks/useWindowDimensions';

import DrawLine from '../canvas/DrawLine';
import DrawNode from '../canvas/DrawNode';

export default function Graph2d({ repoData, handleNodeClick }) {
  if (!repoData.repoName) {
    return <div>데이터없음</div>;
  }

  const { logList } = repoData;

  const { width } = useWindowDimensions();

  return (
    <Wrapper>
      <Stage
        width={width - 467 > 200 ? width - 467 : 200}
        height={150 + logList.length * 50}
        options={{ antialias: true }}
      >
        <DrawLine logList={logList} />
        {logList.map((log, index) => (
          <DrawNode
            handleClick={handleNodeClick}
            key={log.hash}
            log={log}
            index={index}
          />
        ))}
      </Stage>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

Graph2d.defaultProps = {
  repoData: {
    repoName: '',
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
  handleNodeClick: PropTypes.func.isRequired,
};