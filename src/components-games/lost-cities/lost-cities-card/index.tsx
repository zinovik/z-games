import React from 'react';
import { number, bool } from 'prop-types';

import './index.css';

LostCitiesCard.propTypes = {
  card: number.isRequired,
  dim: bool,
}

export function LostCitiesCard({ card, dim }: { card: number, dim?: boolean }) {
  return (
    <div className={`lost-cities-card${dim ? ' lost-cities-card-dim' : ''}`}>
      {card}
    </div>
  );
};
