import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from '../../constants/colors';

const StyledWrapper = styled.div`
  min-width: 250px;
  background-color: ${colors.background.GREY_3};
  color: ${colors.font.WHITE};
`;

export default function CommitBar({ children }) {
  return (
    <>
      <StyledWrapper>{children || null}</StyledWrapper>
    </>
  );
}

CommitBar.propTypes = {
  children: PropTypes.node.isRequired,
};
