import React from 'react';
import { arrayOf, shape, number } from 'prop-types';
import { getCardShape } from 'z-games-six-nimmt';

import { SixNimmtCard } from '../six-nimmt-card';

import './index.scss';

export function SixNimmtCardsList({ cards }: { cards: Array<{ cardNumber: number, cattleHeads: number }> }) {
  return (
    <div className='six-nimmt-cards-list-container'>
      {cards.map(({ cardNumber, cattleHeads }, index) => (
        <SixNimmtCard cardNumber={cardNumber} cattleHeads={cattleHeads} key={index} />
      ))}
    </div>
  );
}

SixNimmtCardsList.propTypes = {
  cards: arrayOf(shape(getCardShape(number))).isRequired,
};

SixNimmtCardsList.defaultProps = {
  cards: [],
};
