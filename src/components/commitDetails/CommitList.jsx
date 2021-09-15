import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { selectFontColor } from '../../utils/color';

export default function CommitList({ logList, colorList, onClickHandler }) {
  return (
    <>
      {logList.map((log, index) => (
        <CommitWrapper
          key={`CommitWrapper${index}${log.hash}`}
          onClick={() => onClickHandler(log.index, log.hash)}
        >
          <CommitInnerWrapper color={colorList[index]}>
            <CommitHash>{log.hash.slice(0, 7)}</CommitHash>
            {log.branchNames
              ? log.branchNames.map((branch) => (
                  <CommitTag
                    key={`CommitTag${index}${branch}`}
                    backgroundColor={log.color}
                    color={selectFontColor(log.color)}
                  >
                    {branch}
                  </CommitTag>
                ))
              : null}
            <CommitMessage>{log.message}</CommitMessage>
          </CommitInnerWrapper>
        </CommitWrapper>
      ))}
    </>
  );
}

const CommitHash = styled.div`
  width: 100px;
  margin-left: 10px;
`;

const CommitWrapper = styled.li`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
`;

const CommitInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  /* width: 100%; */
  height: 60%;
  box-sizing: border-box;
  border-left: 3px solid ${({ color }) => color};
`;

const CommitTag = styled.div`
  padding: 5px;
  margin-left: 10px;
  border-radius: 10px;
  letter-spacing: 1px;
  white-space: nowrap;
  background-color: ${({ backgroundColor }) => backgroundColor || 'black'};
  color: ${({ color }) => color || 'white'};
`;

const CommitMessage = styled.div`
  margin-left: 10px;
  white-space: nowrap;
`;

CommitList.propTypes = {
  logList: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.arrayOf(PropTypes.string),
      ]),
    ),
  ).isRequired,
  colorList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickHandler: PropTypes.func.isRequired,
};
