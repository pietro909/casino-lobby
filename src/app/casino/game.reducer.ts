import { ActionReducer, Action } from '@ngrx/store';
import {CasinoState} from "./casino.state";
import {CategorySelector} from "./category-selector";
import {Casino} from "./casino.component";
import {Game, Category, GameCategoryBundle } from "../models/game.model";
import {SearchBox} from "./search-box.component";

const initialState: CasinoState = {
  allGames: [],
  allCategories: [],
  filteredGames: [],
  filters: {
    category: 'popular-games',
    name: null
  }
};

const safeFilterByCategory =
  (categories: Category[], category: string | null, orElse: Game[] = []): Game[] => {
    if (category === null) {
      return orElse;
    }
    const currentCategory = categories.find(cat => cat.slug === category);
    return currentCategory ? currentCategory.games : [];
  };

const safeFilterByName =
  (games: Game[], name: string | null, orElse: () => Game[]): Game[] => {
    if (name === null) {
      return orElse();
    }
    const matcher = new RegExp(name, 'i');
    return games.filter(game => matcher.test(game.name));
  };

export const gamesReducer: ActionReducer<CasinoState> =
  (state: CasinoState = initialState, action: Action) => {
    switch (action.type) {
      case CategorySelector.StoreEvents.selectCategory:
        return Object.assign({}, state, {
          filteredGames: safeFilterByCategory(state.allCategories, action.payload),
          filters: Object.assign({}, state.filters, {
            category: action.payload
          })
        });
      case Casino.StoreEvents.newGames:
        return Object.assign({}, state, {
          allGames: action.payload
        });
      case Casino.StoreEvents.newCategories:
        return Object.assign({}, state, {
          allCategories: action.payload,
          filteredGames: safeFilterByCategory(state.allCategories, state.filters.category, state.allGames)
        });
        case Casino.StoreEvents.newBundle:
          const payload = <GameCategoryBundle> action.payload;
          return Object.assign({}, state, {
            allCategories: payload.categories,
            allGames: payload.games,
            filteredGames: safeFilterByCategory(payload.categories, state.filters.category, payload.games)
          });
      case SearchBox.StoreEvents.text:
        const name = (action.payload.length > 0) ? action.payload : null;
        const orElse: () => Game[] =
          safeFilterByCategory.bind(this, state.allCategories, state.filters.category, state.allGames);
        const filteredGames = safeFilterByName(
          state.filteredGames,
          name,
          orElse
        );
        return Object.assign({}, state, {
          filteredGames: filteredGames,
          filters: Object.assign({}, state.filters, {
            name: name
          })
        });
     default:
        return state;
    }
  };
