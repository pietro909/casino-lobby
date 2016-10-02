import { Category } from './category.model';
import { Game } from './game.model';

export type GameCategoryBundle = {
  games: Game[];
  categories: Category[];
}