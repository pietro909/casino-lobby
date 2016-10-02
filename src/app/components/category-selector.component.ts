import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { CategoryLabel } from '../models';

@Component({
  selector: 'category-selector',
  template: `
    <div id="{{category.slug}}">
        <button (click)="onClick()"
          class="btn btn-lg btn-primary"
          [ngClass]="{ 'active': selected }">
          {{category.name}}
          <span class="badge">{{category.totalGames}}</span>
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

  onClick() {
    this.store.dispatch({
      type: CategorySelector.StoreEvents.selectCategory,
      payload: this.category.slug
    });
  }

}
