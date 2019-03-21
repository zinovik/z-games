
import { ZGamesApi } from '../';

const zGamesApi = ZGamesApi.Instance;

export const joinGame = (gameNumber: number): void => {
  zGamesApi.socket.emit('join-game', gameNumber);
};

export const openGame = (gameNumber: number): void => {
  zGamesApi.socket.emit('open-game', gameNumber);
};

export const watchGame = (gameNumber: number): void => {
  zGamesApi.socket.emit('watch-game', gameNumber);
};

export const leaveGame = (gameNumber: number): void => {
  zGamesApi.socket.emit('leave-game', gameNumber);
};

export const closeGame = (gameNumber: number): void => {
  zGamesApi.socket.emit('close-game', gameNumber);
};

export const readyToGame = (gameNumber: number): void => {
  zGamesApi.socket.emit('toggle-ready', gameNumber);
};

export const startGame = (gameNumber: number): void => {
  zGamesApi.socket.emit('start-game', gameNumber);
};

export const makeMove = ({ gameNumber, move }: { gameNumber: number, move: string }): void => {
  zGamesApi.socket.emit('make-move', { gameNumber, move });
};

export const sendMessage = ({ gameId, message }: { gameId: string, message: string }): void => {
  zGamesApi.socket.emit('message', { gameId, message });
};

export const newGame = (gameName: string): void => {
  zGamesApi.socket.emit('new-game', gameName);
};
