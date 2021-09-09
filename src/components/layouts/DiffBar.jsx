import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function DiffBar({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  min-width: 250px;
  background-color: ${({ theme: { BACKGROUND } }) => BACKGROUND.GREY_3};
  color: ${({ theme: { FONT } }) => FONT.WHITE};
`;

DiffBar.propTypes = {
  children: PropTypes.node.isRequired,
};
