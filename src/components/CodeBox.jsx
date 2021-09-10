import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Line from './Line';

export default function CodeBox({ code }) {
  const { line, logList } = code;

  return (
    <Wrapper>
      <Line line={line} logList={logList} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 50%;
  padding: 10px;
  font-family: 'Fira Code', monospace;
`;

CodeBox.propTypes = {
  code: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  ).isRequired,
};
