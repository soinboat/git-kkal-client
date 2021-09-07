import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function BranchBar({ data }) {
  console.log('data', data);

  return <StyledWrapper />;
}

const StyledWrapper = styled.div`
  min-width: 200px;
  height: 100%;
  background-color: ${({ theme: { background } }) => background.GREY_3};
  color: ${({ theme: { font } }) => font.WHITE};
`;

BranchBar.defaultProps = {
  data: [],
};

BranchBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
};
