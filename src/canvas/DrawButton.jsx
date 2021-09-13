import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Graphics } from '@inlet/react-pixi';

import { CLICKED_COLOR } from '../constants/graph2dColor';
import convertColor from '../utils/convertColor';

export default function DrawButton({ log, index, clicked, onClickHandler }) {
  const buttonGraphics = useCallback(
    (button) => {
      button.clear();
      button.alpha = index === clicked ? 1 : 0;
      button.beginFill(convertColor(CLICKED_COLOR));
      button.drawRect(0, index * 50, 10000, 50);
      button.interactive = true;
      button.click = () => {
        onClickHandler(index, log.hash);
      };
    },
    [clicked === index],
  );

  return <Graphics draw={buttonGraphics} />;
}

DrawButton.propTypes = {
  index: PropTypes.number.isRequired,
  log: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  ).isRequired,
  clicked: PropTypes.number.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};
