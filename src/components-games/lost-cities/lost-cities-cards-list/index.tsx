import React from 'react';
import { arrayOf, number } from 'prop-types';

import { LostCitiesCard } from '../';
import './index.css';

LostCitiesCardsList.propTypes = {
  cards: arrayOf(number).isRequired,
}

LostCitiesCardsList.defaultProps = {
  cards: [],
}

export function LostCitiesCardsList({ cards }: { cards: number[] }) {
  return (
    <div className='no-thanks-cards-list-container'>
      {cards.map((card, index) => (
        <LostCitiesCard card={card} dim={index !== 0 && card === cards[index - 1] + 1} key={index} />
      ))}
    </div>
  );
};
