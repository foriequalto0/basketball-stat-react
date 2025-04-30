export type StatType = 'FT' | 'FTA' | 'FG' | 'FGA' | '3' | '3PA' | 'rebounds' | 'assists' | 'steals' | 'blocks' | 'turnovers' | 'fouls';

export interface Player {
  id: string;
  name: string;
  number: string;
  stats: Record<StatType, number>;
}

export interface StatLog {
  id: string;
  playerId: string;
  playerName: string;
  statType: StatType;
  value: number;
  timestamp: Date;
} 