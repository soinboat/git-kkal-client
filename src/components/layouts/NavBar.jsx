import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function NavBar({ children }) {
  return (
    <>
      <Wrapper>{children}</Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  height: 60px;
  background-color: ${({ theme: { background } }) => background.BLACK};
  color: ${({ theme: { font } }) => font.GREY};
`;

NavBar.propTypes = {
  children: PropTypes.node.isRequired,
};
