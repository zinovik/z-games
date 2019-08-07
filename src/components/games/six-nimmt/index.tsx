import React, { Fragment } from 'react';
import { object, bool, func } from 'prop-types';
import { Typography } from '@material-ui/core';
import { ISixNimmtData, ROW_MAX_LENGTH } from 'z-games-six-nimmt';

import { SixNimmtCard } from './six-nimmt-card';
import { SixNimmtMove } from './six-nimmt-move';
import { IGame, IUser } from '../../../interfaces';

import './index.scss';

export function SixNimmt({
  game,
  currentUser,
  isMyTurn,
  isButtonsDisabled,
  makeMove,
}: {
  game: IGame;
  currentUser: IUser;
  isMyTurn: boolean;
  isButtonsDisabled: boolean;
  makeMove: ({ gameId, move }: { gameId: string; move: string }) => void;
}) {
  const { gameData } = game;

  if (!currentUser) {
    return null;
  }

  const { cardsTable, currentRound, currentRoundMove, previousMoves }: ISixNimmtData = JSON.parse(gameData);

  const previousCards = previousMoves
    .map(move => {
      const currentPlayer = game.players.find(player => player.id === move.playerId);

      return {
        username: currentPlayer && currentPlayer.username,
        card: move.card,
      };
    })
    .sort((a, b) => a.card.cardNumber - b.card.cardNumber);

  return (
    <Fragment>
      <Typography>
        Round: {currentRound} | Move: {currentRoundMove}
      </Typography>

      {previousCards.length > 0 && (
        <div>
          <Typography>Previous cards:</Typography>
        </div>
      )}

      {previousCards.map(move => (
        <div className="six-nimmt-previous-move" key={move.username}>
          <Typography>{`${move.card.cardNumber} - ${move.username}`}</Typography>
        </div>
      ))}

      {cardsTable &&
        cardsTable.map((cards, rowIndex) => (
          <div className="six-nimmt-cards-table" key={`table-cards-row-${rowIndex}`}>
            {new Array(ROW_MAX_LENGTH).fill(0).map((row, cardIndex) => (
              <SixNimmtCard card={cards[cardIndex]} key={`table-card-${rowIndex}-${cardIndex}`} />
            ))}
          </div>
        ))}

      {isMyTurn && (
        <SixNimmtMove game={game} currentUser={currentUser} isButtonsDisabled={isButtonsDisabled} makeMove={makeMove} />
      )}
    </Fragment>
  );
}

SixNimmt.propTypes = {
  game: object.isRequired,
  currentUser: object.isRequired,
  isMyTurn: bool.isRequired,
  isButtonsDisabled: bool.isRequired,
  makeMove: func.isRequired,
};

SixNimmt.defaultProps = {
  game: {},
  currentUser: {},
  isMyTurn: false,
  isButtonsDisabled: false,
  makeMove: () => null,
};
