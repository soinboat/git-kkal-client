import React from 'react';
import PropTypes from 'prop-types';
import DrawButton from './DrawButton';

export default function DrawButtonList({ lineList, clicked, onClickHandler }) {
  return (
    <>
      {lineList.map((log, index) => (
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
  lineList: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        ]),
      ),
    ),
  ).isRequired,
  clicked: PropTypes.number.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};
