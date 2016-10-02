import { Component, Input, Output } from '@angular/core';
import { Observable } from "rxjs";
import {Store} from "@ngrx/store";

import { CategoryLabel } from "../models/game.model";

@Component({
  selector: 'category-selector',
  template: `
    <div id="{{category.slug}}">
        <button (click)="onClick()">
          {{category.name}}
          <span>{{category.totalGames}}</span>
        </button>
    </div> 
  `
})
export class CategorySelector {

  static StoreEvents = {
    selectCategory: `CategorySelector:selectCategory`
  };

  @Input()
  category: CategoryLabel;

  @Input()
  selected: Boolean;

  @Input()
  store: Store<any>;

  ngOnInit() {
    if (this.selected) {
      
      console.log(`selected ${this.category.slug}`);
    }
  }

  onClick() {
    this.store.dispatch({
      type: CategorySelector.StoreEvents.selectCategory,
      payload: this.category.slug
    });
  }

}
