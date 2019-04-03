import React from 'react';
import { arrayOf, shape, number } from 'prop-types';
import { getCardShape } from 'z-games-lost-cities';

import { LostCitiesCard } from '../lost-cities-card';

import './index.scss';

export function LostCitiesCardsList({ cards }: { cards: Array<{ cost: number, expedition: number }> }) {
  return (
    <div className='lost-cities-cards-list-container'>
      {cards.map(({ cost, expedition }, index) => (
        <LostCitiesCard cost={cost} expedition={expedition} key={index} />
      ))}
    </div>
  );
}

LostCitiesCardsList.propTypes = {
  cards: arrayOf(shape(getCardShape(number))).isRequired,
};

LostCitiesCardsList.defaultProps = {
  cards: [],
};
