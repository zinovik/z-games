import React from 'react';
import { arrayOf, shape, number, bool, func, any } from 'prop-types';
import { getCardShape, EXPEDITIONS_NUMBER } from 'z-games-lost-cities';

import { LostCitiesExpeditionCards } from '../lost-cities-expedition-cards';

import './index.scss';

export function LostCitiesExpeditions({ cards, cardsCount, selectedExpedition, isClickable, onClick }: {
  cards: Array<{ cost: number, expedition: number }>,
  cardsCount?: number[],
  selectedExpedition?: number | null,
  isClickable?: boolean,
  onClick?: (expedition: number) => void,
}) {

  const expeditions: number[][] = [];

  for (let i = 0; i < EXPEDITIONS_NUMBER; i++) {
    expeditions.push([]);
  }

  cards.forEach(card => {
    expeditions[card.expedition].push(card.cost);
  });

  return (
    <div className='lost-cities-expeditions'>
      {expeditions.map((expeditionCards, index) => (
        <LostCitiesExpeditionCards
          cards={expeditionCards}
          expedition={index}
          key={`expedition${index}`}
          cardsCount={cardsCount && cardsCount[index]}
          isSelected={index === selectedExpedition}
          isClickable={isClickable}
          onClick={onClick}
        />
      ))}
    </div>
  );
}

LostCitiesExpeditions.propTypes = {
  cards: arrayOf(shape(getCardShape(number))).isRequired,
  cardsCount: arrayOf(number),
  selectedExpedition: any,
  isClickable: bool,
  onClick: func,
};

LostCitiesExpeditions.defaultProps = {
  cards: [],
};
