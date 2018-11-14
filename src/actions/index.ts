import * as types from '../constants';

export const updateStatus = (connected: boolean) => ({
  type: types.UPDATE_STATUS,
  connected,
});

export const setCurrentUsername = (currentUsername: string) => ({
  type: types.UPDATE_CURRENT_USERNAME,
  currentUsername,
});

export const updateUsersOnline = (usersOnline: types.UserOnline[]) => ({
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

export const updateOpenGameNumber = (openGameNumber: number) => ({
  type: types.UPDATE_OPEN_GAME_NUMBER,
  openGameNumber,
});
