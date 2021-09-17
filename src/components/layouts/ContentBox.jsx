import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function ContentBox({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  min-width: ${({ theme: { size } }) => size.contentBoxMinWidth};
  width: ${({ theme: { size } }) => size.contentBoxWidth};
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme: { background } }) => background.black};
  color: ${({ theme: { font } }) => font.color.white};
`;

ContentBox.propTypes = {
  children: PropTypes.node.isRequired,
};
