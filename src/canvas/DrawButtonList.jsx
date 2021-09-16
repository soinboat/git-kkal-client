import React from 'react';
import PropTypes from 'prop-types';
import DrawButton from './DrawButton';

export default function DrawButtonList({ logList, clicked, onClickHandler }) {
  return (
    <>
      {logList.map((log, index) => (
        <DrawButton
          key={`button${index}${log.hash}`}
          log={log}
          index={index}
          clicked={clicked}
          onClickHandler={onClickHandler}
        />
      ))}
    </>
  );
}

DrawButtonList.propTypes = {
  logList: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      author: PropTypes.string,
      authoredTime: PropTypes.string,
      committer: PropTypes.string,
      committedTime: PropTypes.string,
      parents: PropTypes.arrayOf(PropTypes.string),
      hash: PropTypes.string,
      branchNames: PropTypes.arrayOf(PropTypes.string),
      branchName2: PropTypes.string,
      head: PropTypes.bool,
      index: PropTypes.number,
      position: PropTypes.number,
      color: PropTypes.string,
    }),
  ).isRequired,
  clicked: PropTypes.number.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};
