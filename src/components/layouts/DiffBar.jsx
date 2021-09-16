import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from '../../context/theme';

export default function DiffBar({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  min-width: ${theme.size.diffBarWidth};
  width: 25%;
  height: 100%;
  background-color: ${({ theme: { background } }) => background.grey3};
  color: ${({ theme: { font } }) => font.color.white};
`;

DiffBar.propTypes = {
  children: PropTypes.node.isRequired,
};
