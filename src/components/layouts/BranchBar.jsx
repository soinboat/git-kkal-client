import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function BranchBar({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  min-width: 200px;
  height: 100%;
  background-color: ${({ theme: { background } }) => background.GREY_3};
  color: ${({ theme: { font } }) => font.WHITE};
`;

BranchBar.propTypes = {
  children: PropTypes.node.isRequired,
};
