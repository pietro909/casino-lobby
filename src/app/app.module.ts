import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from "@ngrx/store";
import { LazyLoadImageModule } from 'ng2-lazyload-image';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { Casino, GameView, NoContent, About } from './pages';
import { SERVICES } from './services';
import { SearchBox, GameThumbnail, CategorySelector } from './components';
import { gamesReducer } from './reducers'

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS
];

const storeManager = StoreModule.provideStore({ casinoLobby: gamesReducer });

@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    About,
    Casino,
    NoContent,
    GameThumbnail,
    CategorySelector,
    SearchBox,
    GameView
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    storeManager,
    LazyLoadImageModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    SERVICES,
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule { }

