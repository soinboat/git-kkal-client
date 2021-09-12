import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function DiffList({ targetDiffList }) {
  return (
    <Wrapper>
      <InnerWrapper>
        {targetDiffList?.map((diff) => (
          <FileName key={diff.fileName}>{diff.fileName}</FileName>
        ))}
      </InnerWrapper>
    </Wrapper>
  );
}

const FileName = styled.div`
  word-break: break-all;
  word-wrap: break-word;
  margin: 5px 0;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: auto;
  margin: 10px 0;
`;

const Wrapper = styled.div`
  width: 200px;
  margin-left: 20px;
  background-color: ${({ theme: { background } }) => background.grey3};
  color: ${({ theme: { font } }) => font.color.white};
`;

DiffList.defaultProps = {
  targetDiffList: [],
};

DiffList.propTypes = {
  targetDiffList: PropTypes.arrayOf(
    PropTypes.objectOf(
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
  ),
};
