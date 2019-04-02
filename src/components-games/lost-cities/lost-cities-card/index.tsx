import React from 'react';
import { number } from 'prop-types';

import './index.scss';

LostCitiesCard.propTypes = {
  cost: number.isRequired,
  expedition: number.isRequired,
}

export function LostCitiesCard({ cost, expedition }: { cost: number, expedition: number }) {
  return (
    <div className={`lost-cities-card lost-cities-card-expedition-${expedition}`}>
      {cost || 'X'}
    </div>
  );
};

LostCitiesCard.propTypes = {
  cost: number.isRequired,
  expedition: number.isRequired,
}

LostCitiesCard.defaultProps = {
  cost: 0,
  expedition: 0,
}
