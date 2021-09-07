import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function CommitBar({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  min-width: 250px;
  background-color: ${({ theme: { background } }) => background.GREY_3};
  color: ${({ theme: { font } }) => font.WHITE};
`;

CommitBar.propTypes = {
  children: PropTypes.node.isRequired,
};
