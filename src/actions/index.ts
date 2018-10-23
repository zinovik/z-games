import * as types from '../constants/ActionTypes';

export const updateStatus = connected => ({
  type: types.UPDATE_STATUS,
  connected,
});

export const setCurrentUsername = (currentUsername) => ({
  type: types.SET_CURRENT_USERNAME,
  currentUsername,
});

export const makeMove = (game, move) => ({
  type: types.MAKE_MOVE,
  game,
  move,
});
