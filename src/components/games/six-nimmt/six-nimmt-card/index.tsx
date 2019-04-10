import React from 'react';
import { number, bool, func } from 'prop-types';

import { SixNimmtCattleHeads } from '../six-nimmt-cattle-heads';

import './index.scss';

export function SixNimmtCard({ cardNumber, cattleHeads, isSelected, isClickable, onClick }: {
  cardNumber: number,
  cattleHeads: number,
  isSelected?: boolean,
  isClickable?: boolean,
  onClick?: () => void,
}) {

  const handleClick = () => {
    if (!isClickable || !onClick) {
      return;
    }

    onClick();
  };

  return (
    <div
      className={`six-nimmt-card`
        + `${isSelected ? ' six-nimmt-card-selected' : ''}`
        + `${isClickable ? ' six-nimmt-card-clickable' : ''}`}
      onClick={handleClick}
    >
      {cardNumber > 0 && <div>
        {cardNumber}
      </div>}

      <SixNimmtCattleHeads cattleHeads={cattleHeads} />
    </div>
  );
}

SixNimmtCard.propTypes = {
  cardNumber: number.isRequired,
  cattleHeads: number.isRequired,
  isSelected: bool,
  isClickable: bool,
  onClick: func,
};

SixNimmtCard.defaultProps = {
  cardNumber: 0,
  cattleHeads: 0,
};
