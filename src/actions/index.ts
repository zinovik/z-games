import * as types from '../constants';

export const updateStatus = (connected: boolean) => ({
  type: types.UPDATE_STATUS,
  connected,
});

export const updateCurrentUser = (currentUser: types.User) => ({
  type: types.UPDATE_CURRENT_USER,
  currentUser,
});

export const updateUsersOnline = (usersOnline: types.User[]) => ({
  type: types.UPDATE_USERS_ONLINE,
  usersOnline,
});

export const updateAllGames = (allGames: types.Game[]) => ({
  type: types.UPDATE_ALL_GAMES,
  allGames,
});

export const updateOpenGame = (openGame: types.Game) => ({
  type: types.UPDATE_OPEN_GAME,
  openGame,
});

export const addNewGame = (newGame: types.Game) => ({
  type: types.ADD_NEW_GAME,
  newGame,
});

export const updateGame = (game: types.Game) => ({
  type: types.UPDATE_GAME,
  game,
});
