import { ActionReducer, Action } from '@ngrx/store';
import {CasinoState} from "./casino.state";
import {CategorySelector} from "./category-selector";
import {Casino} from "./casino.component";
import {Game} from "../models/game.model";

const initialState: CasinoState = {
  allGames: [],
  allCategories: [],
  filteredGames: [],
  filters: {
    category: null
  }
};

export const GamesReducer: ActionReducer<CasinoState> =
  (state: CasinoState = initialState, action: Action) => {
    switch (action.type) {
      case CategorySelector.StoreEvents.selectCategory:
        const currentCategory = state.allCategories.find(category => category.name === action.payload);
        return Object.assign({}, state, {
          filteredGames: currentCategory ? currentCategory.games : []
        });
      case Casino.StoreEvents.newGames:
        return Object.assign({}, state, {
          allGames: action.payload
        });
      case Casino.StoreEvents.newCategories:
        let filteredGames: Game[];
        if (state.filters.category !== null) {
          const currentCategory = action.payload.filter(category => category.name === state.filters.category);
          filteredGames = currentCategory ? currentCategory.games : [];
        } else {
          filteredGames = state.allGames;
        }
        return Object.assign({}, state, {
          allCategories: action.payload,
          filteredGames: filteredGames
        });
      default:
        return state;
    }
  };
