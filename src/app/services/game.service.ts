import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs';
import { Game, Category, GameCategoryBundle } from "../models";

const GAMES_API = `https://staging-frontapi.cherrytech.com`;
const ALL_GAMES = `${GAMES_API}/game-categories`;
const GAME_BY_ID = `${GAMES_API}/games/{id}`
const HEADERS = new Headers({
  'CherryTech-Brand': 'cherrycasino.desktop',
  'Accept-Language': 'en-GB'
});
const REQUEST_OPTIONS = new RequestOptions({ headers: HEADERS });
  
type GameResponse = {
  _embedded: {
    game_categories: GameCategoryResponse[]
  },
  links: {},
  total_items: number
}

type GameCategoryResponse = {
  _embedded: {
    games: Json[];
  },
}

type Json = {
  [key: string]: any
}

@Injectable()
export class GameService {

  allGames: BehaviorSubject<Game[]> = new BehaviorSubject([]);
  allCategories: BehaviorSubject<Category[]> = new BehaviorSubject([]);
  gameCategoryBundle: BehaviorSubject<GameCategoryBundle> = new BehaviorSubject({ games: [], categories: [] });

  constructor(private http: Http) {

    // this.http.get(ALL_GAMES, REQUEST_OPTIONS)
    //   .map((response: any) => JSON.parse(response._body))
    //   .map(this.mapGames)
    //   .subscribe(gamesAndCategories => {
    //     this.allGames.next(gamesAndCategories.games);
    //     this.allCategories.next(gamesAndCategories.categories);
    //   });

    setTimeout(() => {

      System.import('../../assets/mock-data/game-categories.json')
        .then(json => {
          console.log('async mockData', json);
          const gamesAndCategories = this.mapGames(json);
          this.allGames.next(gamesAndCategories.games);
          this.allCategories.next(gamesAndCategories.categories);
          this.gameCategoryBundle.next(gamesAndCategories);
        });
    }, 100);
  }

  /**
   * Retrieves game based on the id from the server
   * @param id the game's id
   * @return {Observable<Game>}
   */
  getGameById(id: String): Observable<Game> {
    const url = GAME_BY_ID.replace(/{id}/, id);
    return this.http.get(url, REQUEST_OPTIONS)
      .map((response: any) => JSON.parse(response._body))
      .map(this.mapRawGame)
  }

  private mapRawGame(rawGame: Json): Game {
    return <Game> {
          background: rawGame['background'],
          thumbnail: rawGame['thumbnail'],
          id: rawGame['id'],
          name: rawGame['name'],
          description: rawGame['description'],
          label: rawGame['label'],
          rating: rawGame['rating'],
          slug: rawGame['slug'],
          height: parseInt(rawGame['height'], 10),
          width: rawGame['width'],
          rows: rawGame['rows'],
          cols: rawGame['cols']
        };
  }

  /**
   * Transforms the response's body from the server into an array of all games.
   * Builds also the array of Categories with references games.
   * @param body the response's body
   * @returns {Observable<Game[]>}
   */
  private mapGames(body: GameResponse): GameCategoryBundle {
    const allGames: Game[] = [];

    const categories: Category[] = body._embedded.game_categories.map(category => {
      const games = category._embedded.games.map(rawGame => {
        const game: Game = this.mapRawGame(rawGame);
        allGames.push(game);
        return game;
      });
      return {
        name: category['name'],
        slug: category['slug'],
        order: category['order'],
        games: games
      };
    });
    return {
      games: allGames,
      categories: categories
    };
  }

}
