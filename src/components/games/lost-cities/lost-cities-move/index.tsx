import React, { useState } from 'react';
import { object, bool, func } from 'prop-types';
import { Button, Typography, Checkbox } from '@material-ui/core';
import { ILostCitiesData, ILostCitiesMove } from 'z-games-lost-cities';

import { IGame, IUser } from '../../../../interfaces';

import './index.scss';

export function LostCitiesMove({ game, currentUser, makeMove, isButtonsDisabled }: {
  game: IGame,
  currentUser: IUser,
  isButtonsDisabled: boolean,
  makeMove: ({ gameNumber, move }: { gameNumber: number, move: string }) => void,
}) {
  const [chosenCard, setChosenCard] = useState(null as number | null);
  const [isDiscard, setIsDiscard] = useState(false);
  const [chosenDiscard, setChosenDiscard] = useState(null as number | null);

  if (!currentUser) {
    return null;
  }

  const { gameData } = game;
  const { discards, players: gamePlayers }: ILostCitiesData = JSON.parse(gameData);

  const currentGamePlayer = gamePlayers.find(gamePlayer => gamePlayer.id === currentUser.id);

  if (!currentGamePlayer) {
    return null;
  }

  const { cardsHand } = currentGamePlayer;

  const choseCard = (cardNumber: number): void => {
    setChosenCard(cardNumber === chosenCard ? null : cardNumber);
  };

  const choseDiscard = (discardNumber: number): void => {
    setChosenDiscard(discardNumber === chosenDiscard ? null : discardNumber);
  };

  const move = (): void => {
    if (!chosenCard) {
      return;
    }

    const lostCitiesMove: ILostCitiesMove = {
      card: cardsHand[chosenCard],
      discard: false,
      takeExpedition: chosenDiscard !== null ? discards[chosenDiscard].expedition : null,
    } as ILostCitiesMove;

    makeMove({ gameNumber: game.number, move: JSON.stringify(lostCitiesMove) });
  };

  const handleDiscardChange = () => {
    setIsDiscard(!isDiscard);
  };

  return (
    <div className='lost-cities-buttons'>

      {discards.map((discard, index) => (
        <Button
          variant='contained'
          color='primary'
          className={`lost-cities-button${chosenDiscard === index ? ' lost-cities-chosen-card' : ''}`}
          onClick={() => { choseDiscard(index); }}
          disabled={isButtonsDisabled}
          key={`discard-button${index}`}
        >
          {discard.cost}:{discard.expedition}
        </Button>
      ))}

      {cardsHand.map((card, index) => (
        <Button
          variant='contained'
          color='primary'
          className={`lost-cities-button${chosenCard === index ? ' lost-cities-chosen-card' : ''}`}
          onClick={() => { choseCard(index); }}
          disabled={isButtonsDisabled}
          key={`card-button${index}`}
        >
          {card.cost}:{card.expedition}
        </Button>
      ))}

      <div>
        <Typography>
          <Checkbox onChange={handleDiscardChange} />
          Discard
        </Typography>
      </div>

      <div>
        <Button
          variant='contained'
          color='primary'
          className='lost-cities-button'
          onClick={move}
          disabled={isButtonsDisabled || chosenCard === null}
        >
          Finish Move
        </Button>
      </div>
    </div>
  );
}

LostCitiesMove.propTypes = {
  game: object.isRequired,
  currentUser: object.isRequired,
  isButtonsDisabled: bool.isRequired,
  makeMove: func.isRequired,
};

LostCitiesMove.defaultProps = {
  game: {},
  currentUser: {},
  isButtonsDisabled: false,
  makeMove: () => null,
};
