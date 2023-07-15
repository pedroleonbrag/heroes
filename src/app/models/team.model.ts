import { Hero } from "./hero.model";

export interface Team {
  id: number;
  name: string;
  heroes: Hero[];
}