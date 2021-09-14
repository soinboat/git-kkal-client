import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CommitList from './CommitList';

export default function Description({ logList, colorList, onClickHandler }) {
  return (
    <CommitListWrapper>
      <CommitList
        logList={logList}
        colorList={colorList}
        onClickHandler={onClickHandler}
      />
    </CommitListWrapper>
  );
}

const CommitListWrapper = styled.ul`
  display: inline;
  width: 100%;
  margin: 0;
  padding: 0;
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
