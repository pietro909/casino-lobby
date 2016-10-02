import { ElementRef, OnInit, Component, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

@Component({
  selector: 'search-box',
  styles: [`
    search-box {
      display: block;
      margin: 1.8rem 0.6rem;
    }
  `],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="input-group">
      <span class="input-group-addon" id="basic-addon1">Search</span>
      <input type="text" class="form-control" placeholder="Search" autofocus>
    </div>
    `
})

export class SearchBox implements OnInit {

  static StoreEvents = {
    text: 'SearchBox:TEXT_CHANGED'
  };

  @Input()
  store: Store<any>;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value)
      .debounceTime(500)
      .subscribe((text: string) =>
        this.store.dispatch({
          type: SearchBox.StoreEvents.text,
          payload: text
        })
      );
  }

}