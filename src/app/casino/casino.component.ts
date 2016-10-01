import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { Observable } from 'rxjs';
import { Game } from "../models";
import { Category, CategoryLabel } from "../models/game.model";
import {Store} from "@ngrx/store";
import {CasinoState} from "./casino.state";



@Component({
  selector: 'casino',
  template: `
    <h1>Casino</h1>
    <div>
      <header>
        <!-- game categories -->
        <ul>
          <li *ngFor="let label of categoriesLabels">
            <category-selector [category]="label" [store]="store"></category-selector>
        </ul>
        <!-- game search -->
      </header>
      <section>
        <!-- games -->
        <ul>
            <li *ngFor="let game of games">
                <game-thumbnail [game]="game"></game-thumbnail>
            </li>
        </ul>
      </section>
    </div>
  `
})
export class Casino {

  static StoreEvents = {
    newGames: `CasinoComponent:newGames`,
    newCategories: `CasinoComponent:newCategories`
  };

  private games: Game[];

  categoriesLabels: CategoryLabel[];
  casinoState: Observable<CasinoState>;

  constructor(
    public route: ActivatedRoute,
    private gameService: GameService,
    private store: Store<CasinoState>
  ) {
    this.casinoState = this.store.select<CasinoState>('casinoLobby');
  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
      });

    this.casinoState.subscribe(state => {
      console.log(state);
      this.categoriesLabels = state.allCategories.map(category => {
        return {
          name: category.name,
          slug: category.slug,
          totalGames: category.games.length
        }
      });
      this.games = state.filteredGames;
    });

    this.gameService.allGames.subscribe(games =>
      this.store.dispatch({
        type: Casino.StoreEvents.newGames,
        payload: games
      })
    );

    this.gameService.allCategories.subscribe(categories => {
      this.store.dispatch({
        type: Casino.StoreEvents.newCategories,
        payload: categories
      })
    });
  }

}
