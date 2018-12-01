import * as React from 'react';
import * as PropTypes from 'prop-types';

import { NoThanksCard } from '../../components';

export const NoThanksCardsList = ({ cards }: { cards: number[] }) => {
  return (
    <span>
      {cards.map((card, index) => (
        <NoThanksCard card={card} dim={index !== 0 && card === cards[index - 1] + 1} key={index} />
      ))}
    </span>
  );
};

NoThanksCardsList.propTypes = {
  cards: PropTypes.array.isRequired,
}
