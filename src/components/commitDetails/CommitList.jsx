/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import theme from '../../context/theme';

export default function CommitList({ logList, colorList, onClickHandler }) {
  return (
    <>
      {logList.map((log, index) => (
        <CommitWrapper
          color={colorList[index]}
          key={`CommitWrapper${index}${log.hash}`}
          onClick={() => onClickHandler(log.index, log.hash)}
        >
          {log.branchNames
            ? log.branchNames.map((branch) => (
                <CommitTag
                  key={`CommitTag${index}${branch}`}
                  style={{ backgroundColor: log.color }}
                >
                  {branch}
                </CommitTag>
              ))
            : null}
          <CommitMessage>{log.message}</CommitMessage>
        </CommitWrapper>
      ))}
    </>
  );
}

const CommitWrapper = styled.li`
  display: flex;
  width: 100%;
  height: 49px;
  border-left: 1px solid ${theme.border.white};
  border-bottom: 1px solid ${theme.border.white};
  align-items: center;
  background-color: ${({ color }) => color};
`;

const CommitTag = styled.div`
  padding: 5px;
  margin-left: 10px;
  border-radius: 10px;
  letter-spacing: 1px;
  white-space: nowrap;
`;

const CommitMessage = styled.div`
  margin-left: 10px;
  white-space: nowrap;
`;
