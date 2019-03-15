import React from 'react';
import { arrayOf, number, bool } from 'prop-types';
import { Typography } from '@material-ui/core';

import './index.css';

const DICES: string[] = [
  '\u2680',
  '\u2681',
  '\u2682',
  '\u2683',
  '\u2684',
  '\u2685',
];

PerudoDices.propTypes = {
  dices: arrayOf(number).isRequired,
  highlightNumber: number,
  highlightJoker: bool,
}

PerudoDices.defaultProps = {
  dices: [],
}

export function PerudoDices({ dices, highlightNumber, highlightJoker }: {
  dices: number[],
  highlightNumber?: number,
  highlightJoker?: boolean,
}) {
  return (
    <Typography>
      {dices.map((dice, i) => (
        <span key={i} className={`perudo-dices-dice${dice === highlightNumber || (dice === 1 && highlightNumber && highlightJoker) ? ' perudo-dices-highlight' : ''}`}>
          {DICES[dice - 1]}
        </span>
      ))}
    </Typography>
  );
};
