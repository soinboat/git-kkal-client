import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Log from './Log';

export default function Line({ line, logList }) {
  return (
    <Wrapper>
      {logList.map((log, index) => (
        <InnerWrapper key={`Number-${index}`}>
          <Number>{line + index}</Number>
          <Log log={log} />
        </InnerWrapper>
      ))}
    </Wrapper>
  );
}

const InnerWrapper = styled.div`
  display: flex;
`;

const Number = styled.div`
  width: 40px;
  color: ${({ theme: { FONT } }) => FONT.GREY};
`;

const Wrapper = styled.div`
  width: 100%;
`;

Line.propTypes = {
  line: PropTypes.number.isRequired,
  logList: PropTypes.arrayOf(PropTypes.string).isRequired,
};
