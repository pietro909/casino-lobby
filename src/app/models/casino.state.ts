import { Game } from './game.model';
import { Category } from './category.model';

export interface CasinoStateFilters {
  category: string;
  name: string;
}

export interface CasinoState {
  allGames: Game[];
  allCategories: Category[];
  filteredGames: Game[];
  filters: CasinoStateFilters;
}