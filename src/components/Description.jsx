import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { BACKGROUND_COLOR, BORDER_COLOR } from '../constants/graph2dColor';

export default function Description({ logList, colorList, onClickHandler }) {
  const CommitList = () =>
    logList.map((log, index) => (
      <CommitWrapper
        style={{ backgroundColor: colorList[index] }}
        key={`CommitWrapper${index}${log.hash}`}
        onClick={() => onClickHandler(log.index, log.hash)}
      >
        {log.branchName1
          ? log.branchName1.map((branch) => (
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
    ));

  return (
    <CommitListWrapper>
      <CommitList />
    </CommitListWrapper>
  );
}

const CommitListWrapper = styled.ul`
  display: inline;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const CommitWrapper = styled.li`
  display: flex;
  width: 100%;
  height: 49px;
  background-color: ${BACKGROUND_COLOR};
  border-left: 1px solid ${BORDER_COLOR};
  border-bottom: 1px solid ${BORDER_COLOR};
  align-items: center;
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

Description.propTypes = {
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
