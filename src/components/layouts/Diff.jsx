import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DiffParagraph from '../DiffParagraph';

export default function Diff({ targetDiff }) {
  console.log(targetDiff);
  return (
    <Wrapper>
      <DiffFileName>{targetDiff.fileName}</DiffFileName>
      {targetDiff.changedLog.map((log) => (
        <InnerWrapper>
          <DiffTitle>
            {`${log.codeLineOffsetString} ${log.codeBeginHunk}`}
          </DiffTitle>
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
  width: 100%;
  height: 40px;
  border-top: 1px solid ${({ theme }) => theme.FONT.GERY};
  background-color: ${({ theme }) => theme.BACKGROUND.BLACK};
  color: ${({ theme }) => theme.FONT.GREY};
`;

const InnerWrapper = styled.div`
  margin: 10px;
`;

const DiffTitle = styled.div``;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

Diff.defaultProps = {
  targetDiff: {
    before: {
      line: 0,
      logList: [],
    },
    after: {
      line: 0,
      logList: [],
    },
    codeBeginHunk: '',
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
