import * as types from '../constants/ActionTypes';

const games = (state = <any>[], action) => {
  switch (action.type) {
    case types.MAKE_MOVE:
      return {
        ...state,
        connected: action.connected,
      };
    default:
      return state;
  }
}

export default games;
