import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function CommitBar({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  min-width: 250px;
  height: 100%;
  background-color: ${({ theme: { background } }) => background.GREY_3};
  color: ${({ theme: { font } }) => font.WHITE};
`;

CommitBar.propTypes = {
  children: PropTypes.node.isRequired,
};
