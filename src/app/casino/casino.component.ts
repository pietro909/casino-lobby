import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { Observable } from 'rxjs';
import { Game } from "../models";
import { Category, CategoryLabel } from "../models/game.model";
import { Store } from "@ngrx/store";
import { CasinoState } from "./casino.state";
import { CategorySelector } from './category-selector';


@Component({
  selector: 'casino',
  animations: [
    trigger('thumbnailState', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active',   style({
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('125ms ease-in')),
      transition('active => inactive', animate('250ms ease-out'))
    ])
  ],
  template: `
    <div class="page-header">
      <h1>Casino</h1>
    </div>
    <article>
      <header>
        <!-- game categories -->
        <ul class="row categories">
          <li *ngFor="let label of categoriesLabels">
            <category-selector
              [category]="label"
              [store]="store"
              [selected]="label.slug === currentCategory"
              class="col-xs-4">
            </category-selector>
        </ul>
        <search-box [store]="store"></search-box>
        <!-- game search -->
      </header>
      <section>
        <!-- games -->
        <ul>
            <li *ngFor="let game of games"> 
              <game-thumbnail
                class="col-xs-6 col-md-3"
                [@thumbnailState]="(activeGame && (game.id === activeGame.id)) ? 'active' : 'inactive'"
                [game]="game"
                [baseUrl]="'#/game'"
                (mouseover)="onMouseOverThumnail(game)"
                (mouseleave)="onMouseOverThumnail(null)"></game-thumbnail>
            </li>
        </ul>
      </section>
    </article>
  `
})
export class Casino {

  static StoreEvents = {
    newGames: `CasinoComponent:newGames`,
    newCategories: `CasinoComponent:newCategories`,
    newBundle: `CasinoComponent:newBundle`
  };

  private games: Game[];

  categoriesLabels: CategoryLabel[];
  currentCategory: string = 'popular-games';
  casinoState: Observable<CasinoState>;
  currentState = 'inactive';
  activeGame: Game = null;

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
      this.currentCategory = state.filters.category;
      this.categoriesLabels = state.allCategories.map(category => {
        return {
          name: category.name,
          slug: category.slug,
          totalGames: category.games.length
        }
      });
      this.games = state.filteredGames;
    });

    this.gameService.gameCategoryBundle.subscribe(gameCategoryBundle => {
      this.store.dispatch({
        type: Casino.StoreEvents.newBundle,
        payload: gameCategoryBundle
      });
    });

    this.store.dispatch({
      type: CategorySelector.StoreEvents.selectCategory,
      payload: this.currentCategory
    });
  }

  onMouseOverThumnail(game: Game) {
    this.activeGame = game;
  }

}
