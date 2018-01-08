import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { SlidesState } from './slides.interfaces';
import * as fromSlides from './slides.actions';

@Injectable()
export class SlidesEffects {
  @Effect()
  load = this.dataPersistence.fetch(fromSlides.LOAD, {
    run: (action: fromSlides.LoadSuccess, state: SlidesState) => {
      return new fromSlides.LoadSuccess({ slides: action.payload });
    },
    onError: (action: fromSlides.LoadFailure, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  add = this.dataPersistence.fetch(fromSlides.ADD, {
    run: (action: fromSlides.AddSuccess, state: SlidesState) => {
      return new fromSlides.AddSuccess({ slides: action.payload });
    },
    onError: (action: fromSlides.AddFailure, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  update = this.dataPersistence.fetch(fromSlides.UPDATE, {
    run: (action: fromSlides.Update, state: SlidesState) => {
      return new fromSlides.UpdateSuccess({slides});
    },
    onError: (action: fromSlides.Update, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  delete = this.dataPersistence.fetch(fromSlides.DELETE, {
    run: (action: fromSlides.Delete, state: SlidesState) => {
      return new fromSlides.DeleteSuccess({slides});
    },
    onError: (action: fromSlides.Delete, error) => {
      console.error('Error', error);
    }
  });

  constructor(private actions: Actions, private dataPersistence: DataPersistence<SlidesState>) {}
}
