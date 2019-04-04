import React from 'react';
import { arrayOf, shape, number } from 'prop-types';
import { getCardShape, EXPEDITIONS_NUMBER } from 'z-games-lost-cities';

import { LostCitiesExpeditionCards } from '../lost-cities-expedition-cards';

import './index.scss';

export function LostCitiesExpeditions({ cards }: { cards: Array<{ cost: number, expedition: number }> }) {

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
        />
      ))}
    </div>
  );
}

LostCitiesExpeditions.propTypes = {
  cards: arrayOf(shape(getCardShape(number))).isRequired,
};

LostCitiesExpeditions.defaultProps = {
  cards: [],
};
