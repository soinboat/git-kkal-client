/* eslint-disable react/prop-types */
import React from 'react';
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
