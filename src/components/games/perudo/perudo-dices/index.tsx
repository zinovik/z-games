import React from 'react';
import { arrayOf, number, bool } from 'prop-types';
import { Typography } from '@material-ui/core';

import './index.scss';

const DICES: string[] = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];

export function PerudoDices({
  dices,
  highlightNumber,
  isHighlightJoker,
}: {
  dices: number[];
  highlightNumber?: number;
  isHighlightJoker?: boolean;
}) {
  return (
    <Typography className="perudo-dices-container">
      {dices.map((dice, i) => (
        <span
          key={i}
          className={`perudo-dices-dice${
            dice === highlightNumber || (dice === 1 && highlightNumber && isHighlightJoker)
              ? ' perudo-dices-highlight'
              : ''
          }`}
        >
          {DICES[dice - 1]}
        </span>
      ))}
    </Typography>
  );
}

PerudoDices.propTypes = {
  dices: arrayOf(number).isRequired,
  highlightNumber: number,
  isHighlightJoker: bool,
};

PerudoDices.defaultProps = {
  dices: [],
};
