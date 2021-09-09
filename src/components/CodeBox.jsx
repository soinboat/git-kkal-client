import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LineNumber from './LineNumber';
import LineText from './LineText';

export default function CodeBox({ code }) {
  const { line, offset, logList } = code;

  return (
    <Wrapper>
      <LineNumber line={line} offset={offset} />
      <LineText logList={logList} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
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
