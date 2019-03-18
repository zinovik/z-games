import React from 'react';
import { number } from 'prop-types';

import './index.css';

LostCitiesCard.propTypes = {
  cost: number.isRequired,
  expedition: number.isRequired,
}

export function LostCitiesCard({ cost, expedition }: { cost: number, expedition: number }) {
  return (
    <div className={`lost-cities-card${expedition ? ' lost-cities-card-dim' : ''}`}>
      {cost}
    </div>
  );
};
