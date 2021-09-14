import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import styled, { css, keyframes } from 'styled-components';
import { IoMdArrowDropdown } from 'react-icons/io';

import UI from '../constants/ui';

export default function BranchList({ branchList, handleBranchClick }) {
  const [isBranchListClosed, setIsBranchListClosed] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const toggleCollapse = useCallback(() => {
    setIsBranchListClosed((prev) => !prev);
  }, []);

  const handleClick = (branch, index) => {
    handleBranchClick(branch);
    setSelectedIndex(index);
  };

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
          branchList?.map(({ branchName, hash }, index) => (
            <BranchName
              key={hash}
              className={`${selectedIndex === index ? 'selected' : ''}`}
              onClick={() => {
                handleClick({ branchName, hash }, index);
              }}
            >
              {branchName}
            </BranchName>
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
  transform-origin: top center;
  list-style: none;
  padding-left: 20px;
  animation: ${({ isBranchListClosed }) =>
    !isBranchListClosed &&
    css`
      ${fadeIn} 300ms ease-in-out forwards
    `};

  .selected {
    color: black;
    background-color: #ffffff9c;
  }
`;

const BranchName = styled.li`
  font-size: 1rem;
  cursor: pointer;

  :hover {
    background-color: #ffffff1f;
  }
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
  font-family: Arial, Helvetica, sans-serif;
`;

const CollapseButton = styled.div`
  display: flex;
  align-items: center;
  transform: rotate(0deg);
  overflow: hidden;
  transition: all 0.3s ease-out;
  transform: ${(props) => (props.$rotate ? `rotate(-90deg)` : '')};
  cursor: pointer;
`;

BranchList.defaultProps = {
  branchList: [],
};

BranchList.propTypes = {
  branchList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  handleBranchClick: PropTypes.func.isRequired,
};
