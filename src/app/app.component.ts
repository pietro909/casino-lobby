/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import {CasinoState} from "./casino/casino.state";
import {Store} from "@ngrx/store";

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.scss'
  ],
  template: `
    <ol class="breadcrumb">
      <li>
        <a [routerLink]=" ['./'] ">
          Index
        </a>
      </li>
      <li>
        <a [routerLink]=" ['./about'] ">
          About
        </a>
      </li>
      <li>
        <a [routerLink]=" ['./casino'] ">
          Casino
        </a>
      </li>
    </ol>

    <main class="container">
      <router-outlet></router-outlet>
    </main>

    <footer>
      <span>Casino Lobby demo</span>
   </footer>
  `
})
export class App {

  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  // casinoState: Store<CasinoState>;

  constructor(
    // private store: Store<CasinoState>
  ) {
    // todo: how to pass the freaking store down to the router-outlet
    // this.casinoState = this.store.select<CasinoState>('casinoState');
  }

}
