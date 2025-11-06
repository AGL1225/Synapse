export interface MoveInterval {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export type OperationMode = 'jiggle' | 'switch' | 'hybrid';
