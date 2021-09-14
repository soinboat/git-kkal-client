import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from '../../context/theme';

export default function ContentBox({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-width: ${theme.size.contentBoxMinWidth};
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme: { background } }) => background.black};
  color: ${({ theme: { font } }) => font.color.white};
`;

ContentBox.propTypes = {
  children: PropTypes.node.isRequired,
};
