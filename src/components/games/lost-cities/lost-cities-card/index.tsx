import React from 'react';
import { number, bool, func } from 'prop-types';

import './index.scss';

export function LostCitiesCard({ cost, expedition, isHalfCard, isSelected, isClickable, onClick }: {
  cost: number;
  expedition: number;
  isHalfCard?: boolean;
  isSelected?: boolean;
  isClickable?: boolean;
  onClick?: () => void;
}) {

  const handleClick = () => {
    if (!isClickable || !onClick) {
      return;
    }

    onClick();
  };

  return (
    <div
      className={`lost-cities-card lost-cities-card-expedition-${expedition}`
        + `${isSelected ? ' lost-cities-card-selected' : ''}`
        + `${isClickable ? ' lost-cities-card-clickable' : ''}`
        + `${isHalfCard ? ' lost-cities-card-half' : ''}`}
      onClick={handleClick}
    >
      {cost < 0 ? '' : cost || 'X'}
    </div>
  );
};

LostCitiesCard.propTypes = {
  cost: number.isRequired,
  expedition: number.isRequired,
  isHalfCard: bool,
  isSelected: bool,
  isClickable: bool,
  onClick: func,
};

LostCitiesCard.defaultProps = {
  cost: 0,
  expedition: 0,
};
