import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import { theme } from '../../constants/theme';

const StyledWrapper = styled.div`
  min-width: 200px;
  height: 100%;
  background-color: ${({ theme: { background } }) => background.GREY_3};
  color: ${({ theme: { font } }) => font.WHITE};
`;

export default function BranchBar({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <StyledWrapper>{children || null}</StyledWrapper>
    </ThemeProvider>
  );
}

BranchBar.propTypes = {
  children: PropTypes.node.isRequired,
};
