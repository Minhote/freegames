export enum sortedBy {
  ReleaseDate = "release-date",
  Popularity = "popularity",
  Alphabetical = "alphabetical",
  Relevance = "relevance",
}

export interface CardGameProps {
  description: string;
  developer: string;
  freetogame_profile_url: string;
  game_url: string;
  genre: string;
  id: number;
  minimum_system_requirements: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  platform: string;
  publisher: string;
  release_date: string;
  screenshots: Array<any>;
  short_description: string;
  status: string;
  thumbnail: string;
  title: string;
}

export type RequestOptions<K extends string, V, T extends string> = {
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
