import { Injectable, Inject } from "@angular/core";
import * as fromSlides from "../+state/slides.actions";
import { SlidesState } from "../+state/slides.interfaces";
import { Store } from "@ngrx/store";
import { selectIsLoggedIn } from "@labdat/authentication-state";
import { Observable } from "rxjs/Observable";
import { first } from "rxjs/operators/first";
import { filter } from "rxjs/operators/filter";

@Injectable()
export class SlidesInitializationService {
  constructor(private store: Store<SlidesState>) { }

  public loadSlides() {
    this.store.select(selectIsLoggedIn)
    .pipe(
      first(),
      filter(isLoggedIn => isLoggedIn)
    )
    .subscribe(() => this.store.dispatch(new fromSlides.Load()));
  }
}
