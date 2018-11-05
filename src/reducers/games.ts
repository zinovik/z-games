import * as types from '../constants';

const initialState = {
  allGames: [],
  openGameInfo: null,
  openGameNumber: null,
};

const games = (state: types.GamesState = initialState, action): types.GamesState => {

  switch (action.type) {

    case types.UPDATE_ALL_GAMES_INFO:
      if ((state.openGameNumber || state.openGameNumber === 0)
        && state.allGames
        && state.allGames[state.openGameNumber]
      ) {
        action.allGames[state.openGameNumber] = state.allGames[state.openGameNumber];
        return {
          ...state,
          allGames: action.allGames.map((gameInfo, gameNumber) => {
            if (gameNumber === state.openGameNumber) {
              return { ...state.allGames[gameNumber] };
            } else {
              return { ...gameInfo };
            }
          }),
        };
      }
      return {
        ...state,
        allGames: [...action.allGames],
      };

    case types.UPDATE_OPEN_GAME_INFO:
      if (state.openGameNumber || state.openGameNumber === 0) {
        return {
          ...state,
          allGames: state.allGames.map((gameInfo, gameNumber) => {
            if (gameNumber === state.openGameNumber) {
              return { ...action.openGameInfo };
            } else {
              return { ...gameInfo };
            }
          }),
          openGameInfo: { ...action.openGameInfo },
        };
      }
      return state;

    case types.UPDATE_OPEN_GAME_NUMBER:
      return {
        ...state,
        openGameNumber: action.openGameNumber,
        openGameInfo: action.openGameNumber ? { ...state.allGames[action.openGameNumber]!.gameInfo } : null,
      };

    default:
      return state;

  }

}

export default games;
