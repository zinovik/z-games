import * as types from '../constants';

export const updateStatus = connected => ({
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

export const updateAllGamesInfo = (allGames: types.Game[]) => ({
  type: types.UPDATE_ALL_GAMES_INFO,
  allGames,
});

export const updateOpenGameInfo = (openGameInfo: types.GameInfo) => ({
  type: types.UPDATE_ALL_GAMES_INFO,
  openGameInfo,
});

export const updateOpenGameNumber = (openGameNumber: number) => ({
  type: types.UPDATE_OPEN_GAME_NUMBER,
  openGameNumber,
});
