import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import UI from '../constants/ui';

export default function BranchList({ branchList }) {
  const [listCollapse, setListCollapse] = useState(false);

  const toggleCollapse = useCallback(() => {
    setListCollapse((prev) => !prev);
  }, []);

  return (
    <Wrapper>
      <h2>
        <CollapseButton collapse={listCollapse} onClick={toggleCollapse}>
          <i />
        </CollapseButton>
        <Span>{UI.BRANCH}</Span>
      </h2>
      <span>
        {!listCollapse &&
          branchList?.map((branch) => <div key={branch}>{branch}</div>)}
      </span>
    </Wrapper>
  );
}

const Span = styled.span`
  vertical-align: bottom;
  line-height: 1;
`;

const Wrapper = styled.div`
  min-width: 200px;
  height: 100%;
  background-color: ${({ theme: { BACKGROUND } }) => BACKGROUND.GREY_3};
  margin-left: 20px;
  color: ${({ theme: { FONT } }) => FONT.WHITE};
`;

const CollapseButton = styled.button`
  position: relative;
  width: 26px;
  height: 26px;
  border: none;
  background: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: black;
  cursor: pointer;
  vertical-align: middle;

  i {
    content: '';
    display: block;
    position: absolute;
    width: 10px;
    height: 10px;
    background: url(/icon-arrow-bottom.png) no-repeat left center;
    background-size: cover;
  }
`;

BranchList.defaultProps = {
  branchList: [],
};

BranchList.propTypes = {
  branchList: PropTypes.arrayOf(PropTypes.string),
};
