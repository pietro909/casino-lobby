import { Game } from './game.model';

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