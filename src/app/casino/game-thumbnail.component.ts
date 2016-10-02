import { Component, Input } from '@angular/core';
import { Game } from "../models";


@Component({
  selector: 'game-thumbnail',
  template: `
    <div id="{{game.id}}"
         class="col-xs-6 col-md-3">
      <a href="#" class="thumbnail">
        <img src="{{game.thumbnail}}">
        <div class="caption">
          <h3>{{game.name}}</h3> 
          <p>{{game.description}}</p>
        </div>
      </a>
    </div> 
  `
})
export class GameThumbnail {

  @Input()
  game: Game;

}