export interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameRecord {
  id: string;
  date: string;
  moves: number;
  time: number;
}
