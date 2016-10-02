import {CategorySelector} from "./category-selector";
import {gamesReducer} from './game.reducer';
import {CasinoState} from './casino.state';
import {stateAsString} from './game.state.mock-data';

const initialState: CasinoState = {
    allGames: [],
    allCategories: [],
    filteredGames: [],
    filters: {
      category: 'popular-games',
      name: null
    }
  };

const fakeState: CasinoState = JSON.parse(stateAsString as string);

describe('GameReducer', () => { 

  describe('when called with undefined state', () => {

    it('then it should handle initial state', () => {                              
      expect(gamesReducer(initialState, { type: ''})).toEqual(initialState);
    });                                                                    

  });

  describe('when action CategorySelector.StoreEvents.selectCategory is sent', () => {

    const action = {
      type: CategorySelector.StoreEvents.selectCategory,
      payload: 'table-games'
    }
 
    it('then it should update the category filter', () => {
     const newState = gamesReducer(initialState, action);
      expect(newState.filters).toBeDefined();
      expect(newState.filters.category).toEqual('table-games');
    });

    it('then it should filter the games from right category', () => {
      const filtered = fakeState.allCategories.find(c => c.slug === 'table-games');
      const newState = gamesReducer(fakeState, action);
      expect(newState.filteredGames.length).toEqual(filtered.games.length);
      expect(newState.filteredGames).toEqual(filtered.games);
    });

  });

});