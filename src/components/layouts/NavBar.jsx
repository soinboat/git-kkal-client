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
  background-color: ${({ theme: { BACKGROUND } }) => BACKGROUND.BLACK};
  color: ${({ theme: { FONT } }) => FONT.GREY};
`;

NavBar.defaultProps = {
  children: React.createElement('div'),
};

NavBar.propTypes = {
  children: PropTypes.node,
};
