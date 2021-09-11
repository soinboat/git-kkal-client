import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DiffParagraph from '../DiffParagraph';

export default function Diff({ targetDiff }) {
  return (
    <Wrapper>
      <DiffFileName>{targetDiff.fileName}</DiffFileName>
      {targetDiff.changedLog.map((log) => (
        <InnerWrapper key={log.codeLineOffsetString}>
          <DiffParagraphTitle>
            {`${log.codeLineOffsetString} ${log.codeBeginHunk}`}
          </DiffParagraphTitle>
          <DiffParagraph paragraph={log} />
        </InnerWrapper>
      ))}
    </Wrapper>
  );
}

const DiffFileName = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  border-top: 1px solid ${({ theme }) => theme.font.grey};
  background-color: ${({ theme }) => theme.background.black};
  color: ${({ theme }) => theme.font.grey};
`;

const InnerWrapper = styled.div`
  margin: 10px;
`;

const DiffParagraphTitle = styled.div``;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

Diff.defaultProps = {
  targetDiff: {
    fileName: '',
    changedLog: [],
  },
};

Diff.propTypes = {
  targetDiff: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.objectOf(
          PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.objectOf(
              PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.arrayOf(PropTypes.string),
              ]),
            ),
          ]),
        ),
      ),
    ]),
  ),
};
