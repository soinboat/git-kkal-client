import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function ContentBox({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-width: 200px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme: { background } }) => background.GREY_1};
  color: ${({ theme: { font } }) => font.WHITE};
`;

ContentBox.propTypes = {
  children: PropTypes.node.isRequired,
};
