import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export default function BranchBar({ branchList }) {
  return (
    <StyledWrapper>
      <div>
        {branchList?.map((branch) => (
          <div key={nanoid()}>{branch}</div>
        ))}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  min-width: 200px;
  height: 100%;
  background-color: ${({ theme: { background } }) => background.GREY_3};
  color: ${({ theme: { font } }) => font.WHITE};
`;

BranchBar.defaultProps = {
  branchList: [],
};

BranchBar.propTypes = {
  branchList: PropTypes.arrayOf(PropTypes.string),
};
