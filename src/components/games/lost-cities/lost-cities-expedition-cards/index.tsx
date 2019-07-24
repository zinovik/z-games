import React from 'react';
import { number, arrayOf, bool, func } from 'prop-types';
import { Typography } from '@material-ui/core';

import { LostCitiesCard } from '../lost-cities-card';

import './index.scss';

export function LostCitiesExpeditionCards({
  cards,
  expedition,
  cardsCount,
  isSelected,
  isClickable,
  onClick,
}: {
  cards: number[];
  expedition: number;
  cardsCount?: number;
  isSelected?: boolean;
  isClickable?: boolean;
  onClick?: (expedition: number) => void;
}) {
  const handleClick = (clickExpedition: number) => {
    if (!onClick) {
      return;
    }

    onClick(clickExpedition);
  };

  return (
    <div className="lost-cities-expedition-cards-container">
      {cards.length
        ? cards.map((card, index) => (
            <LostCitiesCard
              cost={card}
              expedition={expedition}
              key={index}
              isHalfCard={index !== cards.length - 1}
              isSelected={isSelected}
              isClickable={isClickable}
              onClick={() => {
                handleClick(expedition);
              }}
            />
          ))
        : ''}

      {!cards.length && <LostCitiesCard cost={-1} expedition={expedition} />}

      <Typography>{cardsCount}</Typography>
    </div>
  );
}

LostCitiesExpeditionCards.propTypes = {
  cards: arrayOf(number).isRequired,
  expedition: number.isRequired,
  cardsCount: number,
  isSelected: bool,
  isClickable: bool,
  onClick: func,
};

LostCitiesExpeditionCards.defaultProps = {
  cards: [],
  expedition: 0,
};
