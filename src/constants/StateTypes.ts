export interface UsersState {
  isConnected: boolean;
  currentUser: User | null;
  usersOnline: User[];
}

export interface User {
  avatar: string;
  createdAt: Date;
  email: string;
  firstName: string;
  gamesPlayed: number;
  gamesWon: number;
  id: string;
  isConfirmed: boolean;
  lastName: string;
  provider: string;
  updatedAt: Date;
  username: string;

  currentGames: Game[]; // ?
}

export interface GamesState {
  allGames: Game[];
  openGame: Game | null;
}

export interface Game {
  id: string;
  number: number;
  name: string;
  state: number;
  playersMax: number;
  playersMin: number;
  createdAt: Date;
  gameData: string;
  players: User[];

  watchers: any[];
  logs: Log[];

  nextPlayers: User[];
}

export interface Log {
  createdAt: Date;
  gameId: string;
  id: string;
  type: string;
  user: User;

  text?: string;
}

export interface PlayerInGame {
  place: number;

  cards?: number[];
  chips?: number;
  points?: number;

  dicesCount?: number;
  dices?: number[];
}
