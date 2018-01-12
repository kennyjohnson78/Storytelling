import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { DataPersistence } from '@nrwl/nx';
import { readAll, hot } from '@nrwl/nx/testing';
import { BoxesEffects } from './boxes.effects';
import { of } from 'rxjs/observable/of';

describe('BoxesEffects', () => {
  let actions;
  let effects: BoxesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [BoxesEffects, DataPersistence, provideMockActions(() => actions)]
    });

    effects = TestBed.get(BoxesEffects);
  });

  describe('someEffect', () => {
    it('should work', async () => {
      actions = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(await readAll(effects.load)).toEqual([{ type: 'DATA_LOADED', payload: {} }]);
    });
  });
});
