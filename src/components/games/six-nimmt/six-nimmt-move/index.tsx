import React, { useState, Fragment } from 'react';
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
  const [currentRoundMoveOld, setCurrentRoundMoveOld] = useState(0);

  if (!currentUser) {
    return null;
  }

  const { gameData } = game;

  const { players: gamePlayers, isCardsPlaying, cardsTable, currentRoundMove }: ISixNimmtData = JSON.parse(gameData);

  if (currentRoundMove !== currentRoundMoveOld) {
    setChosenCard(null);
    setCurrentRoundMoveOld(currentRoundMove);
  }

  const currentGamePlayer = gamePlayers.find(gamePlayer => gamePlayer.id === currentUser.id);

  if (!currentGamePlayer) {
    return null;
  }

  const { cardsHand } = currentGamePlayer;

  const choseCard = (cardNumber: number): void => {
    const currentCard = cardNumber === chosenCard ? null : cardNumber;
    setChosenCard(currentCard);
  };

  const move = (): void => {
    if (chosenCard === null) {
      return;
    }

    let sixNimmtCitiesMove: ISixNimmtMove;

    if (isCardsPlaying) {
      sixNimmtCitiesMove = {
        card: cardsHand[chosenCard],
      } as ISixNimmtMove;
    } else {
      sixNimmtCitiesMove = {
        rowNumber: chosenCard,
      } as ISixNimmtMove;
    }

    makeMove({ gameNumber: game.number, move: JSON.stringify(sixNimmtCitiesMove) });
  };

  return (
    <div className='six-nimmt-buttons'>

      {isCardsPlaying && <Fragment>
        <div>
          <Typography>
            Choose card from the hand to play:
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
      </Fragment>}

      {!isCardsPlaying && <Fragment>
        <div>
          <Typography>
            Choose row number to take:
          </Typography>
        </div>
        <div className='six-nimmt-cards-container'>
          {cardsTable.map((card, index) => (
            <SixNimmtCard
              cardNumber={index + 1}
              isSelected={chosenCard === index}
              isClickable={!isButtonsDisabled}
              onClick={() => { choseCard(index); }}
              key={`card-button${index}`}
            />
          ))}
        </div>
      </Fragment>}

      <div>
        <Button
          variant='contained'
          color='primary'
          className='six-nimmt-button'
          onClick={move}
          disabled={isButtonsDisabled || chosenCard === null}
        >
          {isCardsPlaying ? 'Play' : 'Take'}
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
