import React, { useState } from 'react';
import { object, bool, func } from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { ISixNimmtData, ISixNimmtMove } from 'z-games-six-nimmt';

import { SixNimmtCard } from '../six-nimmt-card';
import { IGame, IUser } from '../../../../interfaces';

import './index.scss';

export function SixNimmtMove({ game, currentUser, makeMove, isButtonsDisabled }: {
  game: IGame,
  currentUser: IUser,
  isButtonsDisabled: boolean,
  makeMove: ({ gameNumber, move }: { gameNumber: number, move: string }) => void,
}) {
  const [chosenCard, setChosenCard] = useState(null as number | null);

  if (!currentUser) {
    return null;
  }

  const { gameData } = game;
  const { players: gamePlayers }: ISixNimmtData = JSON.parse(gameData);

  const currentGamePlayer = gamePlayers.find(gamePlayer => gamePlayer.id === currentUser.id);

  if (!currentGamePlayer) {
    return null;
  }

  const { cardsHand } = currentGamePlayer;

  const choseCard = (cardNumber: number): void => {
    const currentCard = cardNumber === chosenCard ? null : cardNumber;
    setChosenCard(currentCard);
  };

  const move = (isDiscard: boolean): void => {
    if (chosenCard === null) {
      return;
    }

    const lostCitiesMove: ISixNimmtMove = {
      card: cardsHand[chosenCard],
    } as ISixNimmtMove;

    makeMove({ gameNumber: game.number, move: JSON.stringify(lostCitiesMove) });
  };

  return (
    <div className='six-nimmt-buttons'>

      <div>
        <Typography>
          Chose card from the hand to play:
        </Typography>
      </div>
      <div className='six-nimmt-cards-container'>
        {cardsHand.map((card, index) => (
          <SixNimmtCard
            cardNumber={card.cardNumber}
            cattleHeads={card.cattleHeads}
            isSelected={chosenCard === index}
            isClickable={!isButtonsDisabled}
            onClick={() => { choseCard(index); }}
            key={`card-button${index}`}
          />
        ))}
      </div>

      <div>
        <Button
          variant='contained'
          color='primary'
          className='six-nimmt-button'
          onClick={() => move(true)}
          disabled={isButtonsDisabled || chosenCard === null}
        >
          OK
        </Button>
      </div>
    </div>
  );
}

SixNimmtMove.propTypes = {
  game: object.isRequired,
  currentUser: object.isRequired,
  isButtonsDisabled: bool.isRequired,
  makeMove: func.isRequired,
};

SixNimmtMove.defaultProps = {
  game: {},
  currentUser: {},
  isButtonsDisabled: false,
  makeMove: () => null,
};
