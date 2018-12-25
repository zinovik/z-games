import React, { Component, Props, Fragment } from 'react';
import { object, bool, func } from 'prop-types';
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
} from 'z-games-perudo';

import { PerudoDices } from '../../components';
import * as types from '../../constants';
import './index.css';

interface PerudoMoveProps extends Props<{}> {
  game: types.Game,
  isMaputoAble: boolean,
  move: (move: string) => void,
}

interface PerudoMoveState {
  diceNumber: number;
  diceFigure: number;
  isBetImpossible: boolean;
  isMaputo: boolean;
  oldGameData: string;
  isButtonsDisabled: boolean,
}

export class PerudoMove extends Component<PerudoMoveProps, PerudoMoveState> {
  static propTypes = {
    game: object.isRequired,
    isMaputoAble: bool.isRequired,
    move: func.isRequired,
  }

  static defaultProps = {
    game: {},
    isMaputoAble: false,
    move: () => console.log,
  }

  static getDerivedStateFromProps = (nextProps: PerudoMoveProps, prevState: PerudoMoveState) => {
    const { oldGameData } = prevState;
    const { game } = nextProps;
    const { gameData } = game;
    const { currentDiceNumber, currentDiceFigure, isMaputoRound, players: playersInGame } = JSON.parse(gameData);

    if (gameData === oldGameData) {
      return null;
    }

    const allDicesCount = countDices(playersInGame);

    return {
      ...calculateStartBet({ currentDiceNumber, currentDiceFigure, allDicesCount, isMaputoRound }),
      oldGameData: gameData,
      isButtonsDisabled: false,
    };
  }

  public state = {
    diceNumber: 0,
    diceFigure: 0,
    isBetImpossible: false,
    isMaputo: false,
    isStartBetCalculated: false,
    oldGameData: '',
    isButtonsDisabled: false,
  };

  numberInc = (): void => {
    const { diceNumber } = this.state;

    this.setState(numberInc(diceNumber));
  }

  numberDec = (): void => {
    const { diceNumber, diceFigure } = this.state;

    const { game: { gameData } } = this.props;
    const { currentDiceNumber, currentDiceFigure } = JSON.parse(gameData);

    this.setState(numberDec({ diceNumber, diceFigure, currentDiceNumber, currentDiceFigure }));
  }

  figureInc = (): void => {
    const { diceNumber, diceFigure } = this.state;

    const { game: { gameData } } = this.props;
    const { currentDiceNumber, currentDiceFigure, players: playersInGame } = JSON.parse(gameData);
    const allDicesCount = countDices(playersInGame);

    this.setState(figureInc({ diceNumber, diceFigure, currentDiceNumber, currentDiceFigure, allDicesCount }));
  }

  figureDec = (): void => {
    const { diceNumber, diceFigure } = this.state;

    const { game: { gameData } } = this.props;
    const { currentDiceNumber, currentDiceFigure, players: playersInGame } = JSON.parse(gameData);
    const allDicesCount = countDices(playersInGame);

    this.setState(figureDec({ diceNumber, diceFigure, currentDiceNumber, currentDiceFigure, allDicesCount }));
  }

  moveBet = (): void => {
    const { move, isMaputoAble } = this.props;
    const { diceNumber, diceFigure, isMaputo } = this.state;

    if (isMaputoAble) {
      move(JSON.stringify({ number: diceNumber, figure: diceFigure, isMaputo }));
    } else {
      move(JSON.stringify({ number: diceNumber, figure: diceFigure }));
    }

    this.setState({ isButtonsDisabled: true });
  }

  moveNotBelieve = (): void => {
    const { move } = this.props;

    move(JSON.stringify({ notBelieve: true }));

    this.setState({ isButtonsDisabled: true });
  }

  handleMaputoChange = (): void => {
    this.setState({ isMaputo: !this.state.isMaputo });
  }

  render() {
    const {
      game: { gameData },
      isMaputoAble,
    } = this.props;

    const { currentDiceNumber, currentDiceFigure, isMaputoRound, players: playersInGame } = JSON.parse(gameData);
    const allDicesCount = countDices(playersInGame);

    const { diceNumber, diceFigure, isBetImpossible, isButtonsDisabled } = this.state;

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
          <Button onClick={this.numberDec} disabled={myBetNumberDecDisable}>-</Button>
          {diceNumber}
          <Button onClick={this.numberInc} disabled={myBetNumberIncDisable}>+</Button>
        </Typography>

        {!isMaputoRound && <Fragment>
          <Typography>
            Dice figure
					</Typography>
          <Typography>
            <Button onClick={this.figureDec} disabled={myBetFigureDecDisable}>-</Button>
            {diceFigure}
            <Button onClick={this.figureInc} disabled={myBetFigureIncDisable}>+</Button>
          </Typography>
        </Fragment>}

        {isMaputoAble && <Typography>
          <Checkbox onChange={this.handleMaputoChange} />
          Maputo
				</Typography>}

        <Typography className='perudo-move-buttons'>
          <Button variant='contained' color='primary' className='perudo-move-button' onClick={this.moveBet} disabled={isBetImpossible || isButtonsDisabled}>
            Bet
          </Button>
          <Button variant='contained' color='primary' className='perudo-move-button' onClick={this.moveNotBelieve} disabled={!currentDiceNumber || !currentDiceFigure || isButtonsDisabled}>
            Not Believe
          </Button>
        </Typography>

      </Fragment>
    );
  }
};
