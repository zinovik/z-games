import React from 'react';
import { object, bool, func } from 'prop-types';
import { ISixNimmtCard } from 'z-games-six-nimmt';

import { SixNimmtCattleHeads } from '../six-nimmt-cattle-heads';

import './index.scss';

export function SixNimmtCard({
  card,
  isClickable,
  onClick,
  isActive,
}: {
  card?: ISixNimmtCard | null;
  isClickable?: boolean;
  onClick?: () => void;
  isActive?: boolean;
}) {
  const handleClick = () => {
    if (!isClickable || !onClick) {
      return;
    }

    onClick();
  };

  return (
    <div
      className={`six-nimmt-card${isClickable ? ' six-nimmt-card-clickable' : ''}${
        isActive ? ' six-nimmt-card-active' : ''
      }`}
      onClick={handleClick}
    >
      {card && <div>{card.cardNumber}</div>}

      <SixNimmtCattleHeads cattleHeads={card ? card.cattleHeads : 0} />
    </div>
  );
}

SixNimmtCard.propTypes = {
  card: object,
  isClickable: bool,
  onClick: func,
};

SixNimmtCard.defaultProps = {};
