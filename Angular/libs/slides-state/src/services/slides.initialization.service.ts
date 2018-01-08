import { Injectable, Inject } from "@angular/core";
import * as fromSlides from "../+state/slides.actions";
import { SlidesState } from "../+state/slides.interfaces";
import { Store } from "@ngrx/store";
import { getLoggedIn } from "@labdat/authentication-state";
import { Observable } from "rxjs/Observable";
import { first } from "rxjs/operators/first";

@Injectable()
export class SlidesInitializationService {
  constructor(private store: Store<SlidesState>) { }

  public loadSlides() {
    this.store.select(getLoggedIn)
    .pipe(first())
    .subscribe(loggedIn => {
      if (loggedIn) {
        this.store.dispatch(new fromSlides.Load());
      }
    });
  }
}
