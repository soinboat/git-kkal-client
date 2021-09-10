import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function LineNumber({ line, offset }) {
  return (
    <Wrapper>
      {Array.from(Array(offset).keys()).map((index) => (
        <div key={index}>{line + index}</div>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 40px;
  color: ${({ theme: { FONT } }) => FONT.GREY};
`;

LineNumber.defaultProps = {
  offset: 0,
};

LineNumber.propTypes = {
  line: PropTypes.number.isRequired,
  offset: PropTypes.number,
};
