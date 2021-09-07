import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.nav`
  width: 100%;
  height: 60px;
  background-color: ${({ theme: { background } }) => background.BLACK};
  color: ${({ theme: { font } }) => font.GREY};
`;

export default function NavBar() {
  return (
    <>
      <StyledWrapper />
    </>
  );
}
