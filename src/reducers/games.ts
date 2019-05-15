import * as ActionTypes from '../actions/action-types';
import { IGamesState } from '../interfaces';
import { gamesNames } from '../services/game/index';

export const initialState = {
  allGames: [],
  openGame: null,
  filterSettings: {
    isNotStarted: true,
    isStarted: true,
    isFinished: false,
    isWithMe: true,
    isWithoutMe: true,
    isMyMove: true,
    isNotMyMove: true,
    isGames: gamesNames.reduce((acc: any, gameName: string) => { acc[gameName] = true; return acc; }, {}),
    limit: 21,
    offset: 0,
  },
  isHasMore: true,
  isLoadingAllGames: false,
  lastAllGamesCount: 0,
  removingGame: null,
  isYourTurn: false,
};

const games = (state: IGamesState = initialState, action: ActionTypes.Action): IGamesState => {

  switch (action.type) {

    case ActionTypes.UPDATE_ALL_GAMES:
      return {
        ...state,
        allGames: [...action.allGames],
        isHasMore: action.allGames.length !== state.lastAllGamesCount,
        isLoadingAllGames: false,
        lastAllGamesCount: action.allGames.length,
      };

    case ActionTypes.UPDATE_OPEN_GAME:
      if (action.openGame) {
        return {
          ...state,
          openGame: { ...action.openGame },
        };
      }
      return {
        ...state,
        openGame: null,
      };

    case ActionTypes.ADD_NEW_LOG:
      if (state.openGame) {
        return {
          ...state,
          openGame: {
            ...state.openGame,
            logs: [
              action.newLog,
              ...state.openGame.logs,
            ]
          },
        };
      }
      return state;

    case ActionTypes.ADD_NEW_GAME:
      return {
        ...state,
        allGames: [
          action.newGame,
          ...state.allGames,
        ],
      };

    case ActionTypes.UPDATE_GAME:
      return {
        ...state,
        allGames: state.allGames.map(game => game.id === action.game.id ? { ...game, ...action.game } : { ...game }),
      };

    case ActionTypes.REMOVE_GAME:
      return {
        ...state,
        allGames: state.allGames.filter(game => game.id !== action.gameId),
      };

    case ActionTypes.RELOAD_GAMES:
      const isScrollReload = action.filterSettings.limit > state.filterSettings.limit;

      return {
        ...state,
        filterSettings: {
          ...action.filterSettings,
          limit: isScrollReload ? action.filterSettings.limit : initialState.filterSettings.limit,
        },
        isHasMore: isScrollReload ? state.isHasMore : true,
        lastAllGamesCount: isScrollReload ? state.lastAllGamesCount : 0,
        isLoadingAllGames: true,
      };

    case ActionTypes.UPDATE_REMOVING_GAME:
      return {
        ...state,
        removingGame: action.removingGame,
      };

    case ActionTypes.ENABLE_YOUR_TURN:
      return {
        ...state,
        isYourTurn: true,
      };

    case ActionTypes.DISABLE_YOUR_TURN:
      return {
        ...state,
        isYourTurn: false,
      };

    default:
      return state;

  }

}

export default games;
