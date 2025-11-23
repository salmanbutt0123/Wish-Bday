export enum AppStage {
  LOADING = 'LOADING',
  INTRO = 'INTRO',
  REVEAL = 'REVEAL',
  CAKE = 'CAKE',
  CARD = 'CARD'
}

export interface TimeCounter {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}