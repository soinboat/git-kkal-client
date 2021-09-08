import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function CommitList({ targetDiffList }) {
  return (
    <Wrapper>
      <span>
        {targetDiffList?.map((diff) => (
          <div key={diff}>{diff.fileName}</div>
        ))}
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

CommitList.defaultProps = {
  targetDiffList: [],
};

CommitList.propTypes = {
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
