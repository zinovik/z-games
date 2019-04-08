import React, { useState, Fragment } from 'react';
import { object, bool, func } from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { ILostCitiesData, ILostCitiesMove, NAME } from 'z-games-lost-cities';

import { LostCitiesExpeditions } from '../lost-cities-expeditions';
import { LostCitiesCard } from '../lost-cities-card';
import { GamesServices } from '../../../../services';
import { IGame, IUser } from '../../../../interfaces';

import './index.scss';

export function LostCitiesMove({ game, currentUser, makeMove, isButtonsDisabled }: {
  game: IGame,
  currentUser: IUser,
  isButtonsDisabled: boolean,
  makeMove: ({ gameNumber, move }: { gameNumber: number, move: string }) => void,
}) {
  const [chosenCard, setChosenCard] = useState(null as number | null);
  const [takeExpedition, setTakeExpedition] = useState(null as number | null);
  const [isExpeditionPossible, setIsExpeditionPossible] = useState(false);
  const [oldGameData, setOldGameData] = useState('');

  if (!currentUser) {
    return null;
  }

  const { gameData } = game;

  if (gameData !== oldGameData) {
    setChosenCard(null);
    setTakeExpedition(null);
    setIsExpeditionPossible(false);

    setOldGameData(gameData);
  }

  const { discards, discardsCount, players: gamePlayers }: ILostCitiesData = JSON.parse(gameData);

  const currentGamePlayer = gamePlayers.find(gamePlayer => gamePlayer.id === currentUser.id);

  if (!currentGamePlayer) {
    return null;
  }

  const { cardsHand } = currentGamePlayer;

  const choseCard = (cardNumber: number): void => {
    const currentCard = cardNumber === chosenCard ? null : cardNumber;
    setChosenCard(currentCard);

    if (currentCard === null) {
      setIsExpeditionPossible(false);
      return;
    }

    const lostCitiesMove: ILostCitiesMove = {
      card: cardsHand[currentCard],
      isDiscard: false,
      takeExpedition,
    } as ILostCitiesMove;

    setIsExpeditionPossible(GamesServices[NAME].checkMove({ gameData, move: JSON.stringify(lostCitiesMove), userId: currentUser.id }));
  };

  const choseTakeExpedition = (expedition: number): void => {
    setTakeExpedition(expedition === takeExpedition ? null : expedition);
  };

  const move = (isDiscard: boolean): void => {
    if (chosenCard === null) {
      return;
    }

    const lostCitiesMove: ILostCitiesMove = {
      card: cardsHand[chosenCard],
      isDiscard,
      takeExpedition,
    } as ILostCitiesMove;

    makeMove({ gameNumber: game.number, move: JSON.stringify(lostCitiesMove) });
  };

  return (
    <div className='lost-cities-buttons'>

      {discards.length !== 0 && <Fragment>
        <div>
          <Typography>
            Choose discard to get in case you
          </Typography>
        </div>
        <div>
          <Typography>
            don't want to use the main pile:
          </Typography>
        </div>
        <LostCitiesExpeditions
          cards={discards}
          cardsCount={discardsCount}
          selectedExpedition={takeExpedition}
          isClickable={true}
          onClick={choseTakeExpedition}
        />
      </Fragment>}

      <div>
        <Typography>
          Chose card from the hand to play:
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
        <Button
          variant='contained'
          color='primary'
          className='lost-cities-button'
          onClick={() => move(true)}
          disabled={isButtonsDisabled || chosenCard === null}
        >
          Discard
        </Button>
        <Button
          variant='contained'
          color='primary'
          className='lost-cities-button'
          onClick={() => move(false)}
          disabled={isButtonsDisabled || !isExpeditionPossible}
        >
          Expedition
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
