import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from '../../constants/colors';

const StyledWrapper = styled.div`
  width: 100%;
  min-width: 200px;
  background-color: ${colors.background.GREY_1};
  color: ${colors.font.WHITE};
`;

export default function ContentBox({ children }) {
  return (
    <>
      <StyledWrapper>{children || null}</StyledWrapper>
    </>
  );
}

ContentBox.propTypes = {
  children: PropTypes.node.isRequired,
};
