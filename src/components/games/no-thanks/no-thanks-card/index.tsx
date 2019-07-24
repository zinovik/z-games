import React from 'react';
import { number, bool } from 'prop-types';

import './index.scss';

export function NoThanksCard({ card, dim }: { card: number; dim?: boolean }) {
  return <div className={`no-thanks-card${dim ? ' no-thanks-card-dim' : ''}`}>{card}</div>;
}

NoThanksCard.propTypes = {
  card: number.isRequired,
  dim: bool,
};

NoThanksCard.defaultProps = {
  card: 0,
};
