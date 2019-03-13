import { NoThanksData } from 'z-games-no-thanks';
import { PerudoData } from 'z-games-perudo';

export type GameData = NoThanksData | PerudoData;

export const NO_THANKS = 'No, Thanks!';
export const PERUDO = 'Perudo';

export const GAME_NOT_STARTED = 0;
export const GAME_STARTED = 1;
export const GAME_FINISHED = 2;

export const GAME_STATE_LABEL: { [key: number]: string } = {
  [GAME_NOT_STARTED]: 'not started',
  [GAME_STARTED]: 'started',
  [GAME_FINISHED]: 'finished',
};

export const GAMES_LOGOS: { [key: string]: string } = {
  [NO_THANKS]: '/images/no-thanks.png',
  [PERUDO]: '/images/perudo.png',
};
