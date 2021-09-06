import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  width: 100%;
  min-width: 200px;
  background-color: ${({ theme: { background } }) => background.GREY_1};
  color: ${({ theme: { font } }) => font.WHITE};
`;

export default function ContentBox({ children }) {
  return <StyledWrapper>{children || null}</StyledWrapper>;
}

ContentBox.propTypes = {
  children: PropTypes.node.isRequired,
};
