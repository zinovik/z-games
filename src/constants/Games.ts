import { NoThanksData, NO_THANKS } from 'z-games-no-thanks';
import { PerudoData, PERUDO } from 'z-games-perudo';
import { LostCitiesData, LOST_CITIES } from 'z-games-lost-cities';

export type GameData = NoThanksData | PerudoData | LostCitiesData;

export const GAMES_LOGOS: { [key: string]: string } = {
  [NO_THANKS]: '/images/no-thanks.png',
  [PERUDO]: '/images/perudo.png',
  [LOST_CITIES]: '/images/lost-cities.png',
};
