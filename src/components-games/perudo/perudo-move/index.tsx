import React, { Fragment, useState, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { object, bool } from 'prop-types';
import { Button, Typography, Checkbox } from '@material-ui/core';
import {
  countDices,
  calculateStartBet,
  countMinNumber,
  countMaxNumber,
  countMinFigure,
  countMaxFigure,
  numberInc,
  numberDec,
  figureInc,
  figureDec,
  PerudoData
} from 'z-games-perudo';

import { PerudoDices } from '../';
import { makeMove as makeMoveWithoutDispatch } from '../../../actions';
import { IGame, IState } from '../../../interfaces';

import './index.scss';

export function PerudoMovePure({ game, isMaputoAble, makeMove, isButtonsDisabled }: {
  game: IGame,
  isMaputoAble: boolean,
	isButtonsDisabled: boolean,
  makeMove: ({ gameNumber, move }: { gameNumber: number, move: string }) => void, 
}) {
  const [diceNumber, setDiceNumber] = useState(0);
  const [diceFigure, setDiceFigure] = useState(0);
  const [isBetImpossible, setIsBetImpossible] = useState(false);
  const [isMaputo, setIsMaputo] = useState(false);
  const [oldGameData, setOldGameData] = useState('');

  const { gameData } = game;
  const { currentDiceNumber, currentDiceFigure, isMaputoRound, players: playersInGame }: PerudoData = JSON.parse(gameData);
  const allDicesCount = countDices(playersInGame);

  if (gameData !== oldGameData) {
    const {
      diceNumber: newDiceNumber,
      diceFigure: newDiceFigure,
      isBetImpossible: newIsBetImpossible,
    } = calculateStartBet({ currentDiceNumber, currentDiceFigure, allDicesCount, isMaputoRound });

    setDiceNumber(newDiceNumber);
    setDiceFigure(newDiceFigure);
    setIsBetImpossible(newIsBetImpossible || false);

    setOldGameData(gameData);
  }

  const handleNumberInc = (): void => {
    const { diceNumber: newDiceNumber } = numberInc(diceNumber);

    setDiceNumber(newDiceNumber);
  }

  const handleNumberDec = (): void => {
    const { diceNumber: newDiceNumber, diceFigure: newDiceFigure } = numberDec({ diceNumber, diceFigure, currentDiceNumber, currentDiceFigure });

    setDiceNumber(newDiceNumber);
    setDiceFigure(newDiceFigure);
  }

  const handleFigureInc = (): void => {
    const { diceNumber: newDiceNumber, diceFigure: newDiceFigure } = figureInc({ diceNumber, diceFigure, currentDiceNumber, currentDiceFigure, allDicesCount });

    setDiceNumber(newDiceNumber);
    setDiceFigure(newDiceFigure);
  }

  const handleFigureDec = (): void => {
    const { diceNumber: newDiceNumber, diceFigure: newDiceFigure } = figureDec({ diceNumber, diceFigure, currentDiceNumber, currentDiceFigure, allDicesCount });

    setDiceNumber(newDiceNumber);
    setDiceFigure(newDiceFigure);
  }

  const moveBet = (): void => {
    if (isMaputoAble) {
      makeMove({ gameNumber: game.number, move: JSON.stringify({ number: diceNumber, figure: diceFigure, isMaputo }) });
    } else {
      makeMove({ gameNumber: game.number, move: JSON.stringify({ number: diceNumber, figure: diceFigure }) });
    }
  }

  const moveNotBelieve = (): void => {
    makeMove({ gameNumber: game.number, move: JSON.stringify({ notBelieve: true }) });
  }

  const handleMaputoChange = (): void => {
    setIsMaputo(!isMaputo);
  }

  const myBetNumberDecDisable = diceNumber <= countMinNumber({ currentDiceNumber, currentDiceFigure, isMaputoRound });
  const myBetNumberIncDisable = diceNumber >= countMaxNumber({ allDicesCount });
  const myBetFigureDecDisable = diceFigure <= countMinFigure({ currentDiceNumber, currentDiceFigure, allDicesCount });
  const myBetFigureIncDisable = diceFigure >= countMaxFigure({ currentDiceNumber, currentDiceFigure, allDicesCount });

  return (
    <Fragment>
      <Typography>
        My bet
      </Typography>

      <PerudoDices dices={Array(diceNumber).fill(diceFigure)} />

      <Typography>
        Dice number
      </Typography>
      <Typography>
        <Button onClick={handleNumberDec} disabled={myBetNumberDecDisable}>-</Button>
        {diceNumber}
        <Button onClick={handleNumberInc} disabled={myBetNumberIncDisable}>+</Button>
      </Typography>

      {!isMaputoRound && <Fragment>
        <Typography>
          Dice figure
        </Typography>
        <Typography>
          <Button onClick={handleFigureDec} disabled={myBetFigureDecDisable}>-</Button>
          {diceFigure}
          <Button onClick={handleFigureInc} disabled={myBetFigureIncDisable}>+</Button>
        </Typography>
      </Fragment>}

      {isMaputoAble && <Typography>
        <Checkbox onChange={handleMaputoChange} />
        Maputo
      </Typography>}

      <Typography className='perudo-move-buttons'>
        <Button variant='contained' color='primary' className='perudo-move-button' onClick={moveBet} disabled={isBetImpossible || isButtonsDisabled}>
          Bet
        </Button>
        <Button variant='contained' color='primary' className='perudo-move-button' onClick={moveNotBelieve} disabled={!currentDiceNumber || !currentDiceFigure || isButtonsDisabled}>
          Not Believe
        </Button>
      </Typography>

    </Fragment>
  );
};

PerudoMovePure.propTypes = {
  game: object.isRequired,
  isMaputoAble: bool.isRequired,
};

PerudoMovePure.defaultProps = {
  game: {},
  isMaputoAble: false,
};

const mapStateToProps = (state: IState) => ({
  isButtonsDisabled: state.users.isButtonsDisabled,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  makeMove: bindActionCreators(makeMoveWithoutDispatch, dispatch),
});

export const PerudoMove = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PerudoMovePure as ComponentType<any>);
