import React from 'react';
import { number } from 'prop-types';
import { Typography } from '@material-ui/core';

import './index.scss';

const CHIP: string = '\u2B24';

export function NoThanksChips({ chips }: { chips: number }) {
  return (
    <Typography className="no-thanks-chips">
      {new Array(chips).fill(0).map((chip, index) => (
        <span key={`chip-${index}`}>{CHIP}</span>
      ))}{' '}
      ({chips})
    </Typography>
  );
}

NoThanksChips.propTypes = {
  chips: number.isRequired,
};

NoThanksChips.defaultProps = {
  chips: 0,
};
