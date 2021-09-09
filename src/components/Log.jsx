import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function getLogType(log) {
  if (log.length <= 0) {
    return { sign: '', log: '' };
  }

  const sliced = log.slice(1);

  switch (log[0]) {
    case '+':
      return { sign: '+', log: sliced };
    case '-':
      return { sign: '-', log: sliced };
    default:
      return { sign: '', log };
  }
}

export default function Log({ log }) {
  const logType = getLogType(log);

  return (
    <Wrapper logType={logType}>
      <Sign>{logType.sign}</Sign>
      <div>{logType.log}</div>
    </Wrapper>
  );
}

const Sign = styled.div`
  width: 15px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  background-color: ${({ theme, logType }) => theme.CODE_TEXT[logType.sign]};
  opacity: ${({ logType }) => logType && 0.7};
`;

Log.defaultProps = {
  log: '',
};

Log.propTypes = {
  log: PropTypes.string,
};
