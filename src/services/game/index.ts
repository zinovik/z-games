import { BaseGame } from 'z-games-base-game';
import { NoThanks, NAME as NO_THANKS } from 'z-games-no-thanks';
import { Perudo, NAME as PERUDO } from 'z-games-perudo';
import { LostCities, NAME as LOST_CITIES } from 'z-games-lost-cities';

export const gamesServices: { [key: string]: BaseGame } = {
  [NO_THANKS]: NoThanks.Instance,
  [PERUDO]: Perudo.Instance,
  [LOST_CITIES]: LostCities.Instance,
};
