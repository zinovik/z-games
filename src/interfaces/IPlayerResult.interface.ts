export interface IPlayerResult {
  username: string;
  avatar: string;
  place: number,

  points: number,

  cards?: number[],
  chips?: number,

  dicesCount?: number,
}
