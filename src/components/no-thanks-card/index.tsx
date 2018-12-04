import React from 'react';
import { number, bool } from 'prop-types';
import { Typography } from '@material-ui/core';

import './index.css';

NoThanksCard.propTypes = {
  card: number.isRequired,
  dim: bool,
}

export function NoThanksCard({ card, dim }: { card: number, dim?: boolean }) {
  return (
    <Typography className={`no-thanks-card${dim ? ' no-thanks-card-dim' : ''}`}>
      {card}
    </Typography>
  );
};
