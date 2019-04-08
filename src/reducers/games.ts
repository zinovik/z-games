import * as ActionTypes from '../actions/action-types';
import { IGamesState } from '../interfaces';

const initialState = {
  allGames: [],
  openGame: null,
};

const games = (state: IGamesState = initialState, action: ActionTypes.Action): IGamesState => {

  switch (action.type) {

    case ActionTypes.UPDATE_ALL_GAMES:
      return {
        ...state,
        allGames: [...action.allGames],
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
      const allGames = state.allGames.map(game => game.number === action.game.number ? action.game : { ...game });
      return {
        ...state,
        allGames,
      };

    default:
      return state;

  }

}

export default games;
