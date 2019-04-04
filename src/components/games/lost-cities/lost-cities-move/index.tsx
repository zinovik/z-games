import React, { useState, Fragment } from 'react';
import { object, bool, func } from 'prop-types';
import { Button, Typography, Checkbox } from '@material-ui/core';
import { ILostCitiesData, ILostCitiesMove } from 'z-games-lost-cities';

import { LostCitiesCard } from '../lost-cities-card';

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
    if (chosenCard === null) {
      return;
    }

    const lostCitiesMove: ILostCitiesMove = {
      card: cardsHand[chosenCard],
      isDiscard,
      takeExpedition: chosenDiscard !== null && discards[chosenDiscard].expedition,
    } as ILostCitiesMove;

    makeMove({ gameNumber: game.number, move: JSON.stringify(lostCitiesMove) });
  };

  const handleDiscardChange = () => {
    setIsDiscard(!isDiscard);
  };

  return (
    <div className='lost-cities-buttons'>

      {discards.length !== 0 && <Fragment>
        <div>
          <Typography>
            Chose discard to get if you don't want to use the main deck:
          </Typography>
        </div>
        <div className='lost-cities-cards-container'>
          {discards.sort((a, b) => a.expedition - b.expedition).map((discard, index) => (
            <LostCitiesCard
              cost={discard.cost}
              expedition={discard.expedition}
              isSelected={chosenDiscard === index}
              isClickable={!isButtonsDisabled}
              onClick={() => { choseDiscard(index); }}
              key={`discard-button${index}`}
            />
          ))}
        </div>
      </Fragment>}

      <div>
        <Typography>
          Chose card from hand to play:
        </Typography>
      </div>
      <div className='lost-cities-cards-container'>
        {cardsHand.map((card, index) => (
          <LostCitiesCard
            cost={card.cost}
            expedition={card.expedition}
            isSelected={chosenCard === index}
            isClickable={!isButtonsDisabled}
            onClick={() => { choseCard(index); }}
            key={`card-button${index}`}
          />
        ))}
      </div>

      <div>
        <Typography>
          <Checkbox onChange={handleDiscardChange} />
          Discard playing card
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
          Move
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
