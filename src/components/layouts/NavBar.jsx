import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from '../../constants/colors';

const StyledWrapper = styled.nav`
  width: 100%;
  height: 60px;
  background-color: ${colors.background.BLACK};
  color: ${colors.font.GREY};
`;

export default function NavBar({ children }) {
  return (
    <>
      <StyledWrapper>{children || ''}</StyledWrapper>
    </>
  );
}

NavBar.propTypes = {
  children: PropTypes.node.isRequired,
};
