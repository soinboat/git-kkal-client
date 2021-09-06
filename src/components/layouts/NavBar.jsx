import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.nav`
  width: 100%;
  height: 60px;
  background-color: ${({ theme: { background } }) => background.BLACK};
  color: ${({ theme: { font } }) => font.GREY};
`;

export default function NavBar({ children }) {
  return <StyledWrapper>{children || null}</StyledWrapper>;
}

NavBar.propTypes = {
  children: PropTypes.node.isRequired,
};
