import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { object } from 'prop-types';
import { Button } from '@material-ui/core';

import { makeMove as makeMoveWithoutDispatch } from '../../../actions';
import { IGame, IUser, IState } from '../../../interfaces';

import './index.scss';

export function LostCitiesMovePure({ game, currentUser, makeMove, isButtonsDisabled }: {
  game: IGame,
  currentUser: IUser,
  isButtonsDisabled: boolean,
  makeMove: ({ gameNumber, move }: { gameNumber: number, move: string }) => void,
}) {
  const move = (takeCard: boolean): void => {
    makeMove({ gameNumber: game.number, move: JSON.stringify({ takeCard }) });
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className='no-thanks-buttons'>
      <Button
        variant='contained'
        color='primary'
        className='no-thanks-button'
        onClick={() => { move(false); }}
        disabled={isButtonsDisabled}>
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

LostCitiesMovePure.propTypes = {
  game: object.isRequired,
  currentUser: object.isRequired,
};

LostCitiesMovePure.defaultProps = {
  game: {},
  currentUser: {},
};

const mapStateToProps = (state: IState) => ({
  isButtonsDisabled: state.users.isButtonsDisabled,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  makeMove: bindActionCreators(makeMoveWithoutDispatch, dispatch),
});

export const LostCitiesMove = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LostCitiesMovePure as ComponentType<any>);
