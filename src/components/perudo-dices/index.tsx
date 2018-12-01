import * as React from 'react';
import * as PropTypes from 'prop-types';

import './index.css';

const DICES: string[] = [
  '\u2680',
  '\u2681',
  '\u2682',
  '\u2683',
  '\u2684',
  '\u2685',
];

export const PerudoDices = ({ dices }: { dices: number[] }) => {
  return (
    <span>
      {dices.map((dice, i) => (
        <span key={i} className='perudo-dices-dice'>
          {DICES[dice - 1]}
        </span>
      ))}
    </span>
  );
};

PerudoDices.propTypes = {
  dices: PropTypes.array.isRequired,
}
