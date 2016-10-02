import { Component } from '@angular/core';

@Component({
  selector: 'about',
  template: `
    <h1>About</h1>
    <div>
      <h3>
        This Casino Lobby is based on Angular 2 and uses:
      </h3>
      <ul>
        <li><a href="http://reactivex.io/rxjs/">rxjs</a> as event bus (Observables)</li>
        <li><a href="https://github.com/ngrx/store">ngrx/store</a> as Redux implementation</li>
        <li><a href="http://getbootstrap.com">Bootstrap</a> as UI framework</li>
        <li><a href="https://angular.io/docs/ts/latest/guide/animations.html">ngAnimate</a> for simple animations</li>
        <li>SASS as CSS preprocessor</li>
        <li>Webpack for bundling</li>
        <li>ngRouting as routing system</li>
      </ul>
      <p>
        The whole project is based on the nice 
        <a href="https://github.com/AngularClass/angular2-webpack-starter">Angular 2 Webpack starter</a>.
      </p>
    </div>
    <div><h2><a href="/#/casino">Enter the Lobby!</a></h2></div>
    <div>
      <h3>
        pietro.grandi.3d@gmail.com
      </h3>
    </div>
  `
})
export class About {}
