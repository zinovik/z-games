import React, { Fragment, useState } from 'react';
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
	const [isMoved, setIsMoved] = useState(false);
	const [oldGameData, setOldGameData] = useState('');

  if (!currentUser) {
    return null;
  }

  const { gameData } = game;

  if (gameData !== oldGameData) {
    setIsMoved(false);

    setOldGameData(gameData);
  }

  const { players: gamePlayers, isCardsPlaying, cardsTable }: ISixNimmtData = JSON.parse(gameData);

  const currentGamePlayer = gamePlayers.find(gamePlayer => gamePlayer.id === currentUser.id);

  if (!currentGamePlayer) {
    return null;
  }

  const { cardsHand } = currentGamePlayer;

  const moveCard = (cardNumber: number): void => {
    setIsMoved(true);

    const sixNimmtCitiesMove = { card: cardsHand[cardNumber] } as ISixNimmtMove;

    makeMove({ gameNumber: game.number, move: JSON.stringify(sixNimmtCitiesMove) });
  };

  const moveRowNumber = (rowNumber: number): void => {
    setIsMoved(true);

    const sixNimmtCitiesMove = { rowNumber } as ISixNimmtMove;

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
              card={card}
              isClickable={!isButtonsDisabled && !isMoved}
              onClick={() => { moveCard(index); }}
              key={`six-nimmt-card-button-${index}`}
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
            <Button
              variant='contained'
              color='primary'
              className='six-nimmt-button'
              onClick={() => { moveRowNumber(index); }}
              disabled={isMoved}
              key={`roNumber-button-${index}`}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </Fragment>}
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
