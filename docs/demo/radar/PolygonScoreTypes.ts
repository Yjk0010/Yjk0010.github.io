export type Score = [string, number];
export type PolygonScores = Score[];
export interface PropsType {
  size?: number;
  scores: PolygonScores;
  maxScore?: number;
}
