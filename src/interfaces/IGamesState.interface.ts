import { IGame } from './';

export interface IGamesState {
  allGames: IGame[];
  openGame: IGame | null;
}
