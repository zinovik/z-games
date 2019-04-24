import { IGame, IFilterSettings } from './';

export interface IGamesState {
  allGames: IGame[];
  openGame: IGame | null;
  filterSettings: IFilterSettings;
  isHasMore: boolean,
  isLoadingAllGames: boolean,
  lastAllGamesCount: number,
  isOpenGameLoaded: boolean,
}
