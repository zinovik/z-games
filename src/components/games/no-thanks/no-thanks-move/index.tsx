import React from 'react';
import { object, bool, func } from 'prop-types';
import { Button } from '@material-ui/core';
import { INoThanksData, INoThanksMove } from 'z-games-no-thanks';

import { IGame, IUser } from '../../../../interfaces';

import './index.scss';

export function NoThanksMove({ game, currentUser, makeMove, isButtonsDisabled }: {
  game: IGame,
  currentUser: IUser,
  isButtonsDisabled: boolean,
  makeMove: ({ gameNumber, move }: { gameNumber: number, move: string }) => void,
}) {
  const { gameData } = game;

  const move = (takeCard: boolean): void => {
    const noThanksMove: INoThanksMove = {
      takeCard,
    };

    makeMove({ gameNumber: game.number, move: JSON.stringify(noThanksMove) });
  };

  if (!currentUser) {
    return null;
  }

  const { players: gamePlayers }: INoThanksData = JSON.parse(gameData);

  const currentPlayerInGame = gamePlayers.find(playerInGame => playerInGame.id === currentUser.id);
  const myChips = currentPlayerInGame && currentPlayerInGame.chips;

  return (
    <div className='no-thanks-buttons'>
      <Button
        variant='contained'
        color='primary'
        className='no-thanks-button'
        onClick={() => { move(false); }}
        disabled={!myChips || isButtonsDisabled}>
        Pay
      </Button>
      <Button
        variant='contained'
        color='primary'
        className='no-thanks-button'
        onClick={() => { move(true); }}
        disabled={isButtonsDisabled}>
        Take
      </Button>
    </div>
  );
}

NoThanksMove.propTypes = {
  game: object.isRequired,
  currentUser: object.isRequired,
  isButtonsDisabled: bool.isRequired,
  makeMove: func.isRequired,
};

NoThanksMove.defaultProps = {
  game: {},
  currentUser: {},
  isButtonsDisabled: false,
  makeMove: () => null,
};
