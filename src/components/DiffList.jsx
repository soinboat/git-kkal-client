import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function DiffList({ targetDiffList }) {
  return (
    <Wrapper>
      <span>
        {targetDiffList?.map((diff) => (
          <div key={diff.fileName}>{diff.fileName}</div>
        ))}
      </span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-width: 200px;
  height: 100%;
  background-color: ${({ theme: { BACKGROUND } }) => BACKGROUND.GREY_3};
  margin-left: 20px;
  color: ${({ theme: { FONT } }) => FONT.WHITE};
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
