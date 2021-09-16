import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from '../../context/theme';

export default function DiffBox({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${theme.size.contentBoxMinWidth};
  width: 75%;
  height: 100%;
  background-color: ${({ theme: { background } }) => background.black};
  color: ${({ theme: { font } }) => font.color.white};
`;

DiffBox.propTypes = {
  children: PropTypes.node.isRequired,
};
