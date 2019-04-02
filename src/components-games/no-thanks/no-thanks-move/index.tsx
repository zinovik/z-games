import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { object } from 'prop-types';
import { Button } from '@material-ui/core';
import { INoThanksData } from 'z-games-no-thanks';

import { makeMove as makeMoveWithoutDispatch } from '../../../actions';
import { IGame, IUser, IState } from '../../../interfaces';

import './index.scss';

export function NoThanksMovePure({ game, currentUser, makeMove, isButtonsDisabled }: {
  game: IGame,
  currentUser: IUser,
  isButtonsDisabled: boolean,
  makeMove: ({ gameNumber, move }: { gameNumber: number, move: string }) => void,
}) {
  const { gameData } = game;

  const move = (takeCard: boolean): void => {
    makeMove({ gameNumber: game.number, move: JSON.stringify({ takeCard }) });
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

NoThanksMovePure.propTypes = {
  game: object.isRequired,
  currentUser: object.isRequired,
};

NoThanksMovePure.defaultProps = {
  game: {},
  currentUser: {},
};

const mapStateToProps = (state: IState) => ({
  isButtonsDisabled: state.users.isButtonsDisabled,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  makeMove: bindActionCreators(makeMoveWithoutDispatch, dispatch),
});

export const NoThanksMove = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoThanksMovePure as ComponentType<any>);
