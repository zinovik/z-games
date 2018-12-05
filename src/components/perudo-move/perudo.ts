import * as types from '../../constants';

export const DICE_MAX_FIGURE = 6;
export const JOKER_FIGURE = 1;

export const countDices = (playersInGame: types.PlayerInGame[]): number => {
  return playersInGame.reduce((diceCount: number, playerInGame: types.PlayerInGame) => {
    return diceCount + (playerInGame.dicesCount || 0);
  }, 0);
};

export const calculateStartBet = ({ currentDiceNumber, currentDiceFigure, allDicesCount, isMaputoRound }: {
  currentDiceNumber: number,
  currentDiceFigure: number,
  allDicesCount: number,
  isMaputoRound: boolean,
}): {
    diceNumber: number,
    diceFigure: number,
    isBetImpossible?: boolean,
  } => {

  if (!currentDiceNumber || !currentDiceFigure) {
    return { diceNumber: 1, diceFigure: 2 };
  }

  if (currentDiceNumber < allDicesCount) {
    return { diceNumber: currentDiceNumber + 1, diceFigure: currentDiceFigure };
  }

  if (currentDiceFigure === JOKER_FIGURE || isMaputoRound) {
    return { diceNumber: currentDiceNumber, diceFigure: currentDiceFigure, isBetImpossible: true };
  }

  if (currentDiceFigure < DICE_MAX_FIGURE) {
    return { diceNumber: currentDiceNumber, diceFigure: currentDiceFigure + 1 };
  }

  return { diceNumber: Math.ceil(currentDiceNumber / 2), diceFigure: JOKER_FIGURE };
};

export const countMinNumber = ({ currentDiceNumber, currentDiceFigure, isMaputoRound }: {
  currentDiceNumber: number,
  currentDiceFigure: number,
  isMaputoRound: boolean,
}): number => {
  if (!currentDiceNumber || !currentDiceFigure) {
    return 1;
  }

  if (currentDiceFigure === JOKER_FIGURE || isMaputoRound) {
    return currentDiceNumber + 1;
  }

  return Math.ceil(currentDiceNumber / 2);
}

export const countMaxNumber = ({ allDicesCount }: {
  allDicesCount: number,
}): number => {
  return allDicesCount;
};

export const countMinFigure = ({ currentDiceNumber, currentDiceFigure, allDicesCount }: {
  currentDiceNumber: number,
  currentDiceFigure: number,
  allDicesCount: number,
}): number => {
  if (!currentDiceNumber || !currentDiceFigure) {
    return JOKER_FIGURE + 1;
  }

  if (currentDiceFigure !== JOKER_FIGURE) {
    return JOKER_FIGURE;
  }

  if (currentDiceNumber === allDicesCount) {
    return currentDiceFigure;
  }

  return JOKER_FIGURE;
};

export const countMaxFigure = ({ currentDiceNumber, currentDiceFigure, allDicesCount }: {
  currentDiceNumber: number,
  currentDiceFigure: number,
  allDicesCount: number,
}): number => {
  if (currentDiceFigure === JOKER_FIGURE && currentDiceNumber * 2 + 1 >= allDicesCount) {
    return JOKER_FIGURE;
  }

  return DICE_MAX_FIGURE;
};

export const numberInc = (diceNumber: number): { diceNumber: number } => {
  return { diceNumber: diceNumber + 1 };
};

export const numberDec = ({ diceNumber, diceFigure, currentDiceNumber, currentDiceFigure }: {
  diceNumber: number,
  diceFigure: number,
  currentDiceNumber: number,
  currentDiceFigure: number,
}): { diceNumber: number, diceFigure: number } => {

  if (diceFigure === JOKER_FIGURE ||
    diceNumber - 1 > currentDiceNumber ||
    (diceNumber - 1 === currentDiceNumber && diceFigure > currentDiceFigure)) {
    return { diceNumber: diceNumber - 1, diceFigure };
  }

  if (diceNumber - 1 === currentDiceNumber &&
    diceFigure <= currentDiceFigure &&
    currentDiceFigure !== DICE_MAX_FIGURE) {
    return { diceNumber: diceNumber - 1, diceFigure: currentDiceFigure + 1 };
  }

  return { diceNumber: diceNumber - 1, diceFigure: JOKER_FIGURE };

};

export const figureInc = ({ diceNumber, diceFigure, currentDiceNumber, currentDiceFigure, allDicesCount }: {
  diceNumber: number,
  diceFigure: number,
  currentDiceNumber: number,
  currentDiceFigure: number,
  allDicesCount: number,
}): { diceNumber: number, diceFigure: number } => {

  if (diceFigure !== JOKER_FIGURE) {
    return { diceNumber, diceFigure: diceFigure + 1 };
  }

  if (currentDiceFigure === JOKER_FIGURE && diceNumber < currentDiceNumber * 2 + 1) {
    return { diceNumber: currentDiceNumber * 2 + 1, diceFigure: diceFigure + 1 };
  }

  if (currentDiceFigure !== JOKER_FIGURE && diceNumber <= currentDiceNumber) {

    if (currentDiceNumber + 1 <= allDicesCount) {
      return { diceNumber: currentDiceNumber + 1, diceFigure: diceFigure + 1 };
    }
    return { diceNumber: currentDiceNumber, diceFigure: currentDiceFigure + 1 };

  }

  return { diceNumber, diceFigure: diceFigure + 1 };

};

export const figureDec = ({ diceNumber, diceFigure, currentDiceNumber, currentDiceFigure, allDicesCount }: {
  diceNumber: number,
  diceFigure: number,
  currentDiceNumber: number,
  currentDiceFigure: number,
  allDicesCount: number,
}): { diceNumber: number, diceFigure: number } => {

  if (diceFigure - 1 === JOKER_FIGURE || diceFigure - 1 > currentDiceFigure || diceNumber > currentDiceNumber) {
    return { diceNumber, diceFigure: diceFigure - 1 };
  }

  if (diceNumber === allDicesCount && diceFigure - 1 <= currentDiceFigure) {
    return { diceNumber, diceFigure: JOKER_FIGURE };
  }

  return { diceNumber: diceNumber + 1, diceFigure: diceFigure - 1 };

};
