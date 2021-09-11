import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CodeString from './CodeString';

export default function CodeLineList({ line, logList }) {
  return (
    <Wrapper>
      {logList.map((log, index) => (
        <CodeLine key={index}>
          <Number key={`Number-${index}`}>{line + index}</Number>
          <CodeString key={`Log-${index}`} log={log} />
        </CodeLine>
      ))}
    </Wrapper>
  );
}

const CodeLine = styled.div`
  display: flex;
`;

const Number = styled.div`
  width: 40px;
  color: ${({ theme: { font } }) => font.color.grey};
`;

const Wrapper = styled.div`
  width: 100%;
`;

CodeLineList.propTypes = {
  line: PropTypes.number.isRequired,
  logList: PropTypes.arrayOf(PropTypes.string).isRequired,
};
