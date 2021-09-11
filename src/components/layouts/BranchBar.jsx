import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BRANCH_BAR_WIDTH } from '../../constants/size';

export default function BranchBar({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  min-width: ${BRANCH_BAR_WIDTH};
  height: 100%;
  background-color: ${({ theme: { background } }) => background.grey3};
  color: ${({ theme: { font } }) => font.color.white};
`;

BranchBar.propTypes = {
  children: PropTypes.node.isRequired,
};
