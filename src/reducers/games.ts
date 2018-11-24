import * as types from '../constants';

const initialState = {
  allGames: [],
  openGame: null,
  openGameNumber: null,
};

const games = (state: types.GamesState = initialState, action): types.GamesState => {

  switch (action.type) {

    case types.UPDATE_ALL_GAMES:
      return {
        ...state,
        allGames: [...action.allGames],
      };

    case types.UPDATE_OPEN_GAME:
      return {
        ...state,
        openGame: { ...action.openGame },
      };

    default:
      return state;

  }

}

export default games;
