import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { NAV_BAR_HEIGHT } from '../../constants/size';

export default function NavBar({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.nav`
  width: 100%;
  height: ${NAV_BAR_HEIGHT};
  background-color: ${({ theme: { BACKGROUND } }) => BACKGROUND.BLACK};
  color: ${({ theme: { FONT } }) => FONT.GREY};
`;

NavBar.defaultProps = {
  children: React.createElement('div'),
};

NavBar.propTypes = {
  children: PropTypes.node,
};
