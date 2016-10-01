import {Game, Category} from "../models/game.model";

export interface CasinoStateFilters {
  category: string;
}

export interface CasinoState {
  allGames: Game[];
  allCategories: Category[];
  filteredGames: Game[];
  filters: CasinoStateFilters;
}