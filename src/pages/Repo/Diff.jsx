import React from 'react';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import DiffParagraphCode from '../../components/DiffCode/DiffParagraphCode';
import Button from '../../components/Button';

export default function Diff({ targetDiff }) {
  const history = useHistory();

  return (
    <Wrapper>
      <FileNameWrapper>
        <DiffFileName>{targetDiff.fileName}</DiffFileName>
        <Button
          onClick={() => {
            history.push('/repository');
          }}
        >
          Repo
        </Button>
      </FileNameWrapper>
      {targetDiff.changedLog.map((log) => (
        <DiffParagraph key={log.codeLineOffsetString}>
          <DiffParagraphTitle>
            {`${log.codeLineOffsetString} ${log.codeBeginHunk}`}
          </DiffParagraphTitle>
          <DiffParagraphCode paragraph={log} />
        </DiffParagraph>
      ))}
    </Wrapper>
  );
}

const FileNameWrapper = styled.div`
  display: flex;
  align-items: center;
  vertical-align: middle;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  border-top: 1px solid ${({ theme }) => theme.font.color.grey};
  background-color: ${({ theme }) => theme.background.black};
  color: ${({ theme }) => theme.font.color.grey};

  button {
    margin-left: 80%;
    float: right;
  }
`;

const DiffFileName = styled.div`
  float: left;
`;

const DiffParagraph = styled.div`
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
