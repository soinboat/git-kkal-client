import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

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
        <span>Branch</span>
      </h2>
      <span>
        {!listCollapse &&
          branchList?.map((branch) => <div key={nanoid()}>{branch}</div>)}
      </span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-width: 200px;
  height: 100%;
  background-color: ${({ theme: { background } }) => background.GREY_3};
  margin-left: 20px;
  color: ${({ theme: { font } }) => font.WHITE};
`;

const CollapseButton = styled.button`
  width: 26px;
  height: 26px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: black;
  cursor: pointer;
`;

BranchList.defaultProps = {
  branchList: [],
};

BranchList.propTypes = {
  branchList: PropTypes.arrayOf(PropTypes.string),
};
