import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import { theme } from '../../constants/theme';

const StyledWrapper = styled.div`
  width: 100%;
  min-width: 200px;
  background-color: ${({ theme: { background } }) => background.GREY_1};
  color: ${({ theme: { font } }) => font.WHITE};
`;

export default function ContentBox({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <StyledWrapper>{children || null}</StyledWrapper>
    </ThemeProvider>
  );
}

ContentBox.propTypes = {
  children: PropTypes.node.isRequired,
};
