import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import { theme } from '../../constants/theme';

const StyledWrapper = styled.div`
  min-width: 250px;
  background-color: ${({ theme: { background } }) => background.GREY_3};
  color: ${({ theme: { font } }) => font.WHITE};
`;

export default function CommitBar({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <StyledWrapper>{children || null}</StyledWrapper>
    </ThemeProvider>
  );
}

CommitBar.propTypes = {
  children: PropTypes.node.isRequired,
};
