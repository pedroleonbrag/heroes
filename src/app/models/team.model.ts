import { Hero } from "./hero.model";

export const MAXIMUM_POWERSTATS = 3600;

export interface TeamOverview {
  heroes: Hero[];
  totalIntelligence: number;
  totalStrength: number;
  totalSpeed: number;
  totalDurability: number;
  totalPower: number;
  totalCombat: number;
  heightAvg: number;
  weightAvg: number;
}

export interface Styles{
  intelligencebar: string;
}

export type PartialTeam = Partial<TeamOverview>;