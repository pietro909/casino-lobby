import { Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { Game } from "../models";

@Component({
  selector: 'game-thumbnail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div id="{{game.id}}">
      <a href="{{gameUrl}}" class="thumbnail">
        <img src="{{defaultImage}}" [lazyLoad]="game.thumbnail">
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

  @Input()
  baseUrl: String;

  defaultImage: 'assets/img/image-placeholder.png';
  gameUrl = '';

  ngOnInit() {
    const baseUrl = this.baseUrl ? this.baseUrl : '';
    this.gameUrl = `${this.baseUrl}/${this.game.id}`;
  }

}