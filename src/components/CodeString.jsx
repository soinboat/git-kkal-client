import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getLogType from '../utils/getLogType';

export default function CodeString({ log }) {
  const logType = getLogType(log);

  return (
    <Wrapper logType={logType}>
      <Sign>{logType.sign}</Sign>
      <Text>{logType.log}</Text>
    </Wrapper>
  );
}

const Sign = styled.pre`
  width: 15px;
  margin: 0.5rem;
`;

const Text = styled.pre`
  margin: 0.5rem;
  height: auto;
  /* white-space: normal; */
  word-break: break-all;
  word-wrap: break-word;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme, logType }) => {
    if (logType.sign === '+') {
      return theme.background.transparentGreen;
    }

    if (logType.sign === '-') {
      return theme.background.transparentRed;
    }

    return '';
  }};
`;

CodeString.defaultProps = {
  log: '',
};

CodeString.propTypes = {
  log: PropTypes.string,
};
