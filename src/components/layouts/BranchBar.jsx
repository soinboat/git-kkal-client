import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from '../../constants/colors';

const StyledWrapper = styled.div`
  min-width: 200px;
  height: 100%;
  background-color: ${colors.background.GREY_3};
  color: ${colors.font.WHITE};
`;

export default function BranchBar({ children }) {
  return (
    <>
      <StyledWrapper>{children || ''}</StyledWrapper>
    </>
  );
}

BranchBar.propTypes = {
  children: PropTypes.node.isRequired,
};
