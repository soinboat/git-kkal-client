import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import App from './App';
import { theme } from './constants/theme';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    width: 100%;
    height: 100vh;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
