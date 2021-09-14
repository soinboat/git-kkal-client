import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from '../../context/theme';

export default function DiffBar({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  min-width: 250px;
  height: ${theme.size.diffBarWidth};
  background-color: ${({ theme: { background } }) => background.grey3};
  color: ${({ theme: { font } }) => font.color.white};
`;

DiffBar.propTypes = {
  children: PropTypes.node.isRequired,
};
