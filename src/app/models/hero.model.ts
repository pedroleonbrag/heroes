export interface Hero {
  id: number;
  name: string;
  slug: string;
  powerstats: Powerstats;
  appearance: Appearence;
  biography: Biography;
  work: Work;
  connections: Connections;
  images: Images;
}

export interface Images {
  xs: string;
  sm: string;
  md: string;
  lg: string;
}
export interface Connections {
  groupAffiliation: string;
  relatives: string;
}
export interface Work {
  occupation: string;
  base: string;
}

export interface Powerstats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

export interface Appearence {
  gender: string;
  race: string;
  height: any[];
  weight: any[];
  eyeColor: string;
  hairColor: string;
}

export interface Biography {
  fullName: string;
  alterEgos: string;
  aliases: string[];
  placeOfBirth: string;
  firstAppearance: string;
  publisher: string;
  alignment: string;
}
