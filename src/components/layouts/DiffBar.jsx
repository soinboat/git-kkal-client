import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DIFF_BAR_WIDTH } from '../../constants/size';

export default function DiffBar({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  min-width: ${DIFF_BAR_WIDTH};
  background-color: ${({ theme: { background } }) => background.GREY_3};
  color: ${({ theme: { font } }) => font.WHITE};
`;

DiffBar.propTypes = {
  children: PropTypes.node.isRequired,
};
