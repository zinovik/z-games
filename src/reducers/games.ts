import * as types from '../constants';

const initialState = {
  allGames: [],
  openGame: null,
  openGameNumber: null,
};

const games = (state: types.GamesState = initialState, action): types.GamesState => {

  switch (action.type) {

    case types.UPDATE_ALL_GAMES:
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
            }

            return { ...gameInfo };
          }),
        };
      }
      return {
        ...state,
        allGames: [...action.allGames],
      };

    case types.UPDATE_OPEN_GAME:
      if (state.openGameNumber || state.openGameNumber === 0) {
        return {
          ...state,
          allGames: state.allGames.map((game, gameNumber) => {

            if (gameNumber === state.openGameNumber) {
              return { ...action.openGame };
            }

            return { ...game };
          }),
          openGame: { ...action.openGame },
        };
      }
      return state;

    case types.UPDATE_OPEN_GAME_NUMBER:
      return {
        ...state,
        openGameNumber: action.openGameNumber,
        openGame: (action.openGameNumber || action.openGameNumber === 0) ? { ...state.allGames[action.openGameNumber] } : null,
      };

    default:
      return state;

  }

}

export default games;
