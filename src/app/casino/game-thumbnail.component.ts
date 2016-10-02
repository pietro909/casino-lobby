import { Component, Input } from '@angular/core';
import { Game } from "../models";


@Component({
  selector: 'game-thumbnail',
  template: `
    <div id="{{game.id}}">
        <h3>{{game.name}}</h3> 
        <!--<img src="{{game.thumbnail}}">-->
        <p>{{game.description}}</p>
    </div> 
  `
})
export class GameThumbnail {

  @Input()
  game: Game;

}