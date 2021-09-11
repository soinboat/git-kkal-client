import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getLogType from '../utils/getLogType';

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
  display: flex;
  width: 100%;
  background-color: ${({ theme, logType }) => theme.CODE_TEXT[logType.sign]};
`;

Log.defaultProps = {
  log: '',
};

Log.propTypes = {
  log: PropTypes.string,
};
