import React from 'react';
import { arrayOf, number } from 'prop-types';

import { NoThanksCard } from '../../components';

NoThanksCardsList.propTypes = {
  cards: arrayOf(number).isRequired,
}

NoThanksCardsList.defaultProps = {
  cards: [],
}

export function NoThanksCardsList({ cards }: { cards: number[] }) {
  return (
    <span>
      {cards.map((card, index) => (
        <NoThanksCard card={card} dim={index !== 0 && card === cards[index - 1] + 1} key={index} />
      ))}
    </span>
  );
};
