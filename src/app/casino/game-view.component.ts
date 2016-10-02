import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BrowserModule, DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { Game } from '../models';
import { GameService } from '../services/game.service';
import { CasinoState } from './casino.state';

@Component({
  selector: 'game-view',
  template: `
    <article
      class="game-window-container"
      [style.background-image]="'url(' + (game ? game.background : '') + ')'" >
        <section class="game-window"
          [style.width]="size.width"
          [style.height]="size.height">
            <h1>{{game ? game.name : ''}}</h1>
            <h3>{{theMessage}}</h3>
            <img src="{{ game ? game.thumbnail : ''}}">
        </section>
    </article>
   `
})
export class GameView {

  game: Game = null;
  size = {
    width: '100px',
    height: '100px'
  };
  theMessage = 'waiting for the REAL message'; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private store: Store<CasinoState>,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.gameService.getGameById(id)
        .subscribe(game => {
          this.game = game;
          const height: SafeStyle = this.sanitizer.bypassSecurityTrustStyle(`${game.height}px`);
          const width: SafeStyle = this.sanitizer.bypassSecurityTrustStyle(`${game.width}px`);
          // Need the bracket notation because the lazy Google didn't update SafeStyle definitions.
          // Or maybe I just drank too much at Notte Bianca, who knows?
          this.size = {
            width: width['changingThisBreaksApplicationSecurity'],
            height: height['changingThisBreaksApplicationSecurity'] 
          };
        });
    });
  }

}