import React from 'react';
import { arrayOf, shape, number } from 'prop-types';

import { LostCitiesCard } from '../';
import './index.css';

const lostCitiesCardShape = {
  cost: number,
  expedition: number,
};

LostCitiesCardsList.propTypes = {
  cards: arrayOf(shape(lostCitiesCardShape)).isRequired,
}

LostCitiesCardsList.defaultProps = {
  cards: [],
}

export function LostCitiesCardsList({ cards }: { cards: Array<{ cost: number, expedition: number }> }) {
  return (
    <div className='lost-cities-cards-list-container'>
      {cards.map(({ cost, expedition }, index) => (
        <LostCitiesCard cost={cost} expedition={expedition} key={index} />
      ))}
    </div>
  );
};
