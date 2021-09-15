import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Graphics } from '@inlet/react-pixi';

import convertColor from '../utils/convertColor';
import theme from '../context/theme';
import { getHalf } from '../utils/calcLayout';

export default function DrawButton({ log, index, clicked, onClickHandler }) {
  const buttonGraphics = useCallback(
    (button) => {
      button.clear();
      button.alpha = index === clicked ? 1 : 0;
      button.beginFill(convertColor(theme.background.purple));
      button.drawRect(
        0,
        index * theme.size.graph2dNodeSpacing +
          (getHalf(theme.size.graph2dNodeSpacing) -
            theme.size.graph2dNodeRadius),
        10000,
        theme.size.graph2dNodeRadius * 2,
      );
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
