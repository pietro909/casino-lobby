import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InteralStateType } from './app.service';
import { About } from './about';
import { Casino } from './casino';
import { SERVICES } from './services';
import { NoContent } from './no-content';
import { GameThumbnail } from './casino/game-thumbnail.component';
import { CategorySelector } from './casino/category-selector';
import { StoreModule } from "@ngrx/store";
import { GamesReducer } from './casino/game.reducer'
import { SearchBox } from "./casino/search-box.component";

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

const storeManager = StoreModule.provideStore({ casinoLobby: GamesReducer });

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    About,
    Casino,
    NoContent,
    GameThumbnail,
    CategorySelector,
    SearchBox
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    storeManager,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    SERVICES,
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule { }

