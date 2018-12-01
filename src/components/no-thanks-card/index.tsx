import * as React from 'react';
import * as PropTypes from 'prop-types';

import './index.css';

export const NoThanksCard = ({ card, dim }: { card: number, dim?: boolean }) => {
  return (
    <span className={`no-thanks-card${dim ? ' no-thanks-card-dim' : ''}`}>
      {card}
    </span>
  );
};

NoThanksCard.propTypes = {
  card: PropTypes.number.isRequired,
  dim: PropTypes.bool,
}
