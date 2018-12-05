import React, { Component, Props, Fragment } from 'react';
import { object, bool, func } from 'prop-types';
import { Button, Typography, Checkbox } from '@material-ui/core';

import { PerudoDices } from '../../components';
import * as types from '../../constants';
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
} from './perudo';

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

  static getDerivedStateFromProps = (props: PerudoMoveProps, state: PerudoMoveState) => {
    const { diceNumber: diceNumberState, diceFigure: diceFigureState } = state;

    if (diceNumberState && diceFigureState) {
      return null;
    }

    const { game } = props;
    const { gameData } = game;
    const { currentDiceNumber, currentDiceFigure, isMaputoRound, players: playersInGame } = JSON.parse(gameData);
    const allDicesCount = countDices(playersInGame);

    const { diceNumber, diceFigure, isBetImpossible } = calculateStartBet({ currentDiceNumber, currentDiceFigure, allDicesCount, isMaputoRound });

    return { diceNumber, diceFigure, isBetImpossible };
  }

  public state = {
    diceNumber: 0,
    diceFigure: 0,
    isBetImpossible: false,
    isMaputo: false,
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
    const { move } = this.props;
    const { diceNumber, diceFigure, isMaputo } = this.state;

    move(JSON.stringify({ number: diceNumber, figure: diceFigure, isMaputo }));
    this.setState({ diceNumber: 0, diceFigure: 0 });
  }

  moveNotBelieve = (): void => {
    const { move } = this.props;

    move(JSON.stringify({ notBelieve: true }));
    this.setState({ diceNumber: 0, diceFigure: 0 });
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

    const { diceNumber, diceFigure, isBetImpossible } = this.state;

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
          <Button variant='contained' onClick={this.numberDec} disabled={myBetNumberDecDisable}>-</Button>
          {diceNumber}
          <Button variant='contained' onClick={this.numberInc} disabled={myBetNumberIncDisable}>+</Button>
        </Typography>

        {!isMaputoRound && <Fragment>
          <Typography>
            Dice figure
					</Typography>
          <Typography>
            <Button variant='contained' onClick={this.figureDec} disabled={myBetFigureDecDisable}>-</Button>
            {diceFigure}
            <Button variant='contained' onClick={this.figureInc} disabled={myBetFigureIncDisable}>+</Button>
          </Typography>
        </Fragment>}

        {isMaputoAble && <Typography>
          <Checkbox onChange={this.handleMaputoChange} />
          Maputo
				</Typography>}

        <Typography>
          <Button variant='contained' onClick={this.moveBet} disabled={isBetImpossible}>Bet</Button>
          <Button variant='contained' onClick={this.moveNotBelieve} disabled={!currentDiceNumber || !currentDiceFigure}>Not Believe</Button>
        </Typography>

      </Fragment>
    );
  }
};
