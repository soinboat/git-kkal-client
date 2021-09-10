import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import App from './App';
import { THEME } from './constants/theme';

const GlobalStyle = createGlobalStyle`
  html, body {
    display: block;
    height: 100%;
    min-width: 400px;
    margin: 0;
    padding: 0;
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={THEME}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
