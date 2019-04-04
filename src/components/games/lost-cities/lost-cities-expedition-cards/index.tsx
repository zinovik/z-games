import React from 'react';
import { number, arrayOf } from 'prop-types';

import { LostCitiesCard } from '../lost-cities-card';

import './index.scss';

export function LostCitiesExpeditionCards({ cards, expedition }: { cards: number[], expedition: number }) {
  return (
    <div className='lost-cities-expedition-cards-container'>
      {cards.length ? cards.map((card, index) => (
        <LostCitiesCard
          cost={card}
          expedition={expedition}
          key={index}
          isHalfCard={index !== cards.length - 1}
        />
      )) : ''}

      {!cards.length && (
        <LostCitiesCard
          cost={-1}
          expedition={expedition}
        />
      )}
    </div>
  );
}

LostCitiesExpeditionCards.propTypes = {
  cards: arrayOf(number).isRequired,
  expedition: number.isRequired,
};

LostCitiesExpeditionCards.defaultProps = {
  cards: [],
  expedition: 0,
};
