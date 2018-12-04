import React from 'react';
import { number } from 'prop-types';
import { Typography } from '@material-ui/core';

const CHIP: string = '\u2B24';

NoThanksChips.propTypes = {
  chips: number.isRequired,
}

NoThanksChips.defaultProps = {
  chips: 0,
}

export function NoThanksChips({ chips }: { chips: number }) {
  return (
    <Typography>
      {Array(chips + 1).join(CHIP)} ({chips})
    </Typography>
  );
};
