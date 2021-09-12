import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import styled, { css, keyframes } from 'styled-components';
import { IoMdArrowDropdown } from 'react-icons/io';

import UI from '../constants/ui';

export default function BranchList({ branchList }) {
  const [isBranchListClosed, setListCollapse] = useState(false);

  const toggleCollapse = useCallback(() => {
    setListCollapse((prev) => !prev);
  }, []);

  return (
    <Wrapper>
      <BranchTitle>
        <CollapseButton $rotate={isBranchListClosed} onClick={toggleCollapse}>
          <IoMdArrowDropdown />
        </CollapseButton>
        <TitleText>{UI.BRANCH}</TitleText>
      </BranchTitle>
      <BranchNameList isBranchListClosed={isBranchListClosed}>
        {!isBranchListClosed &&
          branchList?.map((branch) => (
            <BranchName key={branch}>{branch}</BranchName>
          ))}
      </BranchNameList>
    </Wrapper>
  );
}

const fadeIn = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;

const BranchNameList = styled.ul`
  animation: ${({ isBranchListClosed }) =>
    !isBranchListClosed &&
    css`
      ${fadeIn} 300ms ease-in-out forwards
    `};
  transform-origin: top center;
  list-style: none;
  padding-left: 20px;
`;

const BranchName = styled.li`
  font-size: 0.8rem;
`;

const BranchTitle = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const TitleText = styled.div`
  vertical-align: bottom;
  line-height: 1;
`;

const Wrapper = styled.div`
  width: 200px;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${({ theme: { background } }) => background.grey3};
  color: ${({ theme: { font } }) => font.color.white};
`;

const CollapseButton = styled.div`
  display: flex;
  align-items: center;
  transform: rotate(0deg);
  overflow: hidden;
  transition: all 0.3s ease-out;
  transform: ${(props) => (props.rotate ? `rotate(-90deg)` : '')};
`;

BranchList.defaultProps = {
  branchList: [],
};

BranchList.propTypes = {
  branchList: PropTypes.arrayOf(PropTypes.string),
};
