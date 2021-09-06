import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import { theme } from '../../constants/theme';

const StyledWrapper = styled.nav`
  width: 100%;
  height: 60px;
  background-color: ${({ theme: { background } }) => background.BLACK};
  color: ${({ theme: { font } }) => font.GREY};
`;

export default function NavBar({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <StyledWrapper>{children || null}</StyledWrapper>
    </ThemeProvider>
  );
}

NavBar.propTypes = {
  children: PropTypes.node.isRequired,
};
