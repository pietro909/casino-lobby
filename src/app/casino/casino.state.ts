import {Game, Category} from "../models/game.model";

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