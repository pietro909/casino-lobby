import {
  inject,
  TestBed
} from '@angular/core/testing';

// Load the implementations that should be tested
import { App } from './app.component';
import { AppState } from './app.service';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppState,
      App
    ]}));

  it('should have a url', inject([ App ], (app: App) => {
    expect(app.url).toEqual('https://github.com/pietro909/casino-lobby');
  }));

  it('should have a name', inject([ App ], (app: App) => {
    expect(app.name).toEqual('Casino Lobby with Angular 2');
  }));

});
