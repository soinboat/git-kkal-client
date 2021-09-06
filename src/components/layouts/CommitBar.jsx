import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  min-width: 250px;
  background-color: ${({ theme: { background } }) => background.GREY_3};
  color: ${({ theme: { font } }) => font.WHITE};
`;

export default function CommitBar({ children }) {
  return <StyledWrapper>{children || null}</StyledWrapper>;
}

CommitBar.propTypes = {
  children: PropTypes.node.isRequired,
};
