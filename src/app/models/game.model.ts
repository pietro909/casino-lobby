export type Game = {
  background: string;
  thumbnail: string;
  id: string;
  name: string;
  description: string;
  label: string;
  rating: number;
  slug: string;
  height: number;
  width: number;
  rows: number;
  cols: number;
}

export interface BasicCategoryProperties {
  name: string;
  order: number;
  slug: string;
}

export interface Category extends BasicCategoryProperties {
  games: Game[];
}

export type CategoryLabel = {
  name: string;
  slug: string;
  totalGames: number;
}
