export enum sortedBy {
  ReleaseDate = "release-date",
  Popularity = "popularity",
  Alphabetical = "alphabetical",
  Relevance = "relevance",
}

export enum platform {
  Browser = "browser",
  PC = "pc",
  All = "all",
}

export enum category {
  MMORPG = "mmorpg",
  Shooter = "shooter",
  Strategy = "strategy",
  MOBA = "moba",
  Racing = "racing",
  Sports = "sports",
  Social = "social",
  Sandox = "sandbox",
  OpenWorld = "open-world",
  Survavial = "survival",
  PVP = "pvp",
  PVE = "pve",
  Pixel = "pixel",
  Voxel = "voxel",
  Zombie = "zombie",
  TurnBased = "turn-based",
  FirstPerson = "first-person",
  ThirdPerson = "third-Person",
  TopDown = "top-down",
  Tank = "tank",
  Space = "space",
  Sailing = "sailing",
  SideScroller = "side-scroller",
  SuperHero = "superhero",
  PermaDeath = "permadeath",
  Card = "card",
  BattleRoyale = "battle-royale",
  MMO = "mmo",
  MMOFPS = "mmofps",
  MMOTPS = "mmotps",
  "3D" = "3d",
  "2D" = "2d",
  Anime = "anime",
  Fantasy = "fantasy",
  "SCI-Fi" = "sci-fi",
  Fighting = "fighting",
  "Action-RPG" = "action-rpg",
  Action = "action",
  Military = "military",
  "Martial-Arts" = "martial-arts",
  Flight = "flight",
  "Low-Spec" = "low-spec",
  "Tower-Defense" = "tower-defense",
  Horror = "horror",
  MMORTS = "mmorts",
}

export enum tag {
  MMORPG = "mmorpg",
  Shooter = "shooter",
  Strategy = "strategy",
  MOBA = "moba",
  Racing = "racing",
  Sports = "sports",
  Social = "social",
  Sandox = "sandbox",
  OpenWorld = "open-world",
  Survavial = "survival",
  PVP = "pvp",
  PVE = "pve",
  Pixel = "pixel",
  Voxel = "voxel",
  Zombie = "zombie",
  TurnBased = "turn-based",
  FirstPerson = "first-person",
  ThirdPerson = "third-Person",
  TopDown = "top-down",
  Tank = "tank",
  Space = "space",
  Sailing = "sailing",
  SideScroller = "side-scroller",
  SuperHero = "superhero",
  PermaDeath = "permadeath",
  Card = "card",
  BattleRoyale = "battle-royale",
  MMO = "mmo",
  MMOFPS = "mmofps",
  MMOTPS = "mmotps",
  "3D" = "3d",
  "2D" = "2d",
  Anime = "anime",
  Fantasy = "fantasy",
  "SCI-Fi" = "sci-fi",
  Fighting = "fighting",
  "Action-RPG" = "action-rpg",
  Action = "action",
  Military = "military",
  "Martial-Arts" = "martial-arts",
  Flight = "flight",
  "Low-Spec" = "low-spec",
  "Tower-Defense" = "tower-defense",
  Horror = "horror",
  MMORTS = "mmorts",
}

export const tags = [
  "mmorpg",
  "shooter",
  "strategy",
  "moba",
  "racing",
  "sports",
  "social",
  "sandbox",
  "open-world",
  "survival",
  "pvp",
  "pve",
  "pixel",
  "voxel",
  "zombie",
  "turn-based",
  "first-person",
  "third-Person",
  "top-down",
  "tank",
  "space",
  "sailing",
  "side-scroller",
  "superhero",
  "permadeath",
  "card",
  "battle-royale",
  "mmo",
  "mmofps",
  "mmotps",
  "3d",
  "2d",
  "anime",
  "fantasy",
  "sci-fi",
  "fighting",
  "action",
  "military",
  "martial-arts",
  "flight",
  "low-spec",
  "tower-defense",
  "horror",
];

export const platformNames = ["browser", "pc", "Browser and PC"];

export interface GameInfoData {
  id: number;
  title: string;
  thumbnail: string;
  status: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: Date;
  freetogame_profile_url: string;
  minimum_system_requirements: MinimumSystemRequirements;
  screenshots: Screenshot[];
}

export interface MinimumSystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

export interface Screenshot {
  id: number;
  image: string;
}

export type RequestOptions<
  K extends string,
  V extends string,
  T extends string
> = {
  method: "GET";
  url: T;
  params: Record<K, V>; // Aquí usamos Record para definir el tipo de 'params'
  headers: {
    "X-RapidAPI-Key": "a0a09286c0mshbf1e816d2904e1ap1d212cjsn4727a13316d8";
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com";
  };
};

export interface InfoSingleGame {
  developer: string;
  freetogame_profile_url: string;
  game_url: string;
  genre: string;
  id: number;
  platform: string;
  publisher: string;
  release_date: Date;
  short_description: string;
  thumbnail: string;
  title: string;
}

export interface fetchFilterParamsWithTag {
  platform: string;
  tag?: string | undefined;
}

export interface fetchFilterParamsWithCategory {
  platform: string;
  category?: string | undefined;
}
