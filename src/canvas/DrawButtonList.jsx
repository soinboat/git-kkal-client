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
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.arrayOf(PropTypes.string),
      ]),
    ),
  ).isRequired,
  clicked: PropTypes.number.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};
