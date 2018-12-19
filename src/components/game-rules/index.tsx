import React, { Component, Props, Fragment } from 'react';
import { string, func } from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, Typography, DialogActions } from '@material-ui/core';

import * as types from '../../constants';

interface GameRulesProps extends Props<{}> {
  gameName: string,
  close: () => void,
}

export class GameRules extends Component<GameRulesProps, {}> {

  static propTypes = {
    gameName: string.isRequired,
    close: func.isRequired,
  };

  static defaultProps = {
    gameName: 'game-name',
    close: () => console.log,
  };

  handleClose = () => {
    const { close } = this.props;

    close();
  };

  render() {
    const { gameName } = this.props;

    return (
      <Dialog open={true} onClose={this.handleClose} fullScreen={true}>

        <DialogTitle>Game rules - {gameName}</DialogTitle>

        <DialogContent>
        
          {gameName === types.NO_THANKS && <Fragment>
            <Typography gutterBottom={true}>
              No Thanks! is a card game for three to five players designed by Thorsten Gimmler. Originally called Geschenkt! (presented (as a gift) in German) and published by Amigo Spiele in 2004, it was translated into English by Z-Man Games.
            </Typography>

            <Typography gutterBottom={true}>
              There are playing cards numbered 3 to 35 in the game, and nine cards are removed from the deck. Each player receives 11 chips. The first player flips over the top card and either takes it (earning him points according to the value) or passes on the card by paying a chip (placing it on the card). If a player takes a card, he/she also takes all chips that have been put on the card, that player then flips over the next card and decides if he/she want it, and so the game continues until all cards have been taken.
            </Typography>

            <Typography gutterBottom={true}>
              At the end of the game, cards give points according to their value, but cards in a row only count as a single card with the lowest value (e.g. A run of 30, 29, 28, 27 is only worth 27 points.) Chips are worth one negative point each. The player(s) with the lowest number of points win the game.
            </Typography>

            <Typography gutterBottom={true}>
              No Thanks! was nominated in 2005 for the German Spiel des Jahres (Game of the Year) award.
            </Typography>
          </Fragment>}

          {gameName === types.PERUDO && <Fragment>
            <Typography gutterBottom={true}>
              This ancient Peruvian dice game is played with 2 to 6 players. It is a skillful game of guesswork, bluff and luck.
            </Typography>

            <Typography gutterBottom={true}>
              Simultaneously, all players shake their 5 dice in their cups and turn them over on the table, using the cup to conceal their dice from the other players. Having looked at his or her own dice the first player makes a call based on an estimate of how many dice of a particular number there are under all the cups on the table. Two factors should be considered when making a call:
            </Typography>

            <Typography gutterBottom={true}>
              1. The total number of dice on the table: If there are six players, for example, then there will be a total of thirty dice in play. The probability therefore is that there will be five dice of any given value: five twos, five threes, etc.
            </Typography>

            <Typography gutterBottom={true}>
              2. All ones - known as “aces” - are wild and are counted as the value of whichever bid is made. Thus a call of “seven fours” is based on a prediction that there will be a total of seven dice with a value of either four or ace.
            </Typography>

            <Typography gutterBottom={true}>
              The player to the opener’s left then makes a call and the bidding proceeds around the table. Each bid must be higher than the last. So a call of “seven fours” can be followed by, say, “seven fives” or by “eight twos”, but not by “six sixes” or by “seven twos”. Jump bids (“nine threes” for example) can also be made, with the intention of raising the stakes for the next player.
            </Typography>

            <Typography gutterBottom={true}>
              If a player feels unable to raise the bidding any further, the call of “dudo” (meaning “I doubt” in Spanish) is made. This halts the bidding process and the last call made is accepted.
            </Typography>

            <Typography gutterBottom={true}>
              All players then uncover their dice (the player who called dudo first, the player who made the final bid last). Dice of the relevant value are counted and added to the number of aces revealed. If the call was, say, “seven twos” and there are fewer than seven dice showing either two or ace, then the player who made the bid loses one die. If there are seven (or more) twos and aces showing, then the player who called dudo loses one die. All dice that are removed from the game should be placed in the pouch so that the total number of dice in play is hidden.
            </Typography>

            <Typography gutterBottom={true}>
              The player who loses a die starts the bidding process in the next round.
            </Typography>

            <Typography gutterBottom={true}>
              Aces
            </Typography>

            <Typography gutterBottom={true}>
              Once the bidding has started, another option is available: the call of “aces”. This is a prediction of how many aces there will be. To do this, the number of dice predicted is halved from that of the previous bid. So a bid of “eight sixes” can be followed by a call of “four aces” (or “five aces” etc). Fractions are always rounded up,
            </Typography>

            <Typography gutterBottom={true}>
              Following a call of “aces”, the next player can either raise the quantity of aces or can revert to numbers by doubling the quantity of aces called and adding one. So following a call of “four aces”, the next bid must be at least “five aces” or at least nine of a number. A call of dudo can also of course be made.
            </Typography>

            <Typography gutterBottom={true}>
              Each quantity of “aces” can only be bid once in a round. 
            </Typography>

            <Typography gutterBottom={true}>
              A call of “aces” cannot be made on the first bid of a round.
            </Typography>

            <Typography gutterBottom={true}>
              Maputo
            </Typography>

            <Typography gutterBottom={true}>
              Any player who loses his or her fourth die is declared Maputo. During the bidding in that round, other players are only allowed to raise the quantity of dice, not the value (i.e. an opening call by a Maputo player of “two threes” can only be followed by “three threes”, “four threes” etc.)
            </Typography>

            <Typography gutterBottom={true}>
              During a Maputo round, aces are not wild.
            </Typography>

            <Typography gutterBottom={true}>
              Only a Maputo player can make an opening call of “aces”.
            </Typography>

            <Typography gutterBottom={true}>
              A player can only be Maputo once in the course of a game: the round immediately following the loss of the fourth die.
            </Typography>

            <Typography gutterBottom={true}>
              A player with only one die left who has already been Maputo is allowed during a subsequent Maputo round to raise the value during the bidding (i.e. by calling say “two fours” after a call of “two threes”). Subsequent players then follow the new value that has been called.
            </Typography>

            <Typography gutterBottom={true}>
              The end of the game
            </Typography>

            <Typography gutterBottom={true}>
              A player who loses his or her final die is out of the game. The player to the immediate left starts the bidding in the next round.
            </Typography>

            <Typography gutterBottom={true}>
              When there are only two players left the Maputo rules do not apply Even if both players have only one die left numbers can be changed in the bidding and aces are still wild.
            </Typography>

            <Typography gutterBottom={true}>
              The winner is the last player with any dice left.
            </Typography>
          </Fragment>}

        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleClose}>Ok</Button>
        </DialogActions>

      </Dialog>
    );
  }

}
