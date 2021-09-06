import React from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../constants/theme';

const CommitMessageBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const CommitMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 80%;
  min-width: 100px;
  height: 40px;
  margin: 10px;
  padding: 10px;
  background-color: ${({ theme: { background } }) => background.GREY_4};
`;

const CommitHash = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: ${({ theme: { background } }) => background.GREY_4};
`;

export default function CommitMessageBox() {
  const HASH = '6abff1';
  const MESSAGE = 'Refactor: css almost complete.';

  return (
    <CommitMessageBoxWrapper>
      <ThemeProvider theme={theme}>
        <CommitHash>
          commit:
          {HASH}
        </CommitHash>
        <CommitMessage>{MESSAGE}</CommitMessage>
      </ThemeProvider>
    </CommitMessageBoxWrapper>
  );
}
