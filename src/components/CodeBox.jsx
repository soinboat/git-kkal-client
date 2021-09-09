import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function CodeBox({ code }) {
  return (
    <Wrapper>
      <div>{JSON.stringify(code)}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
`;

CodeBox.propTypes = {
  code: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  ).isRequired,
};
