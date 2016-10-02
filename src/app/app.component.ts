import { Component, ViewEncapsulation } from '@angular/core';

import { GameService } from './services';

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
  name = 'Casino Lobby with Angular 2';
  url = 'https://github.com/pietro909/casino-lobby';

  constructor(
    private gameService: GameService,
  ) {
    // question: how to pass the freaking store down to the router-outlet
   }

}
