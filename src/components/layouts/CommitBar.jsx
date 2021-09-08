import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function CommitBar({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  min-width: 250px;
  background-color: ${({ theme: { BACKGROUND } }) => BACKGROUND.GREY_3};
  color: ${({ theme: { FONT } }) => FONT.WHITE};
`;

CommitBar.propTypes = {
  children: PropTypes.node.isRequired,
};
