import { SlidesState, slidesAdapter } from './slides.interfaces';
import * as fromSlides from './slides.actions';

export const slidesInitialState: SlidesState = slidesAdapter.getInitialState({
  loaded: false,
  loading: false
});

export function slidesReducer(state: SlidesState = slidesInitialState, action: fromSlides.Actions): SlidesState {
  switch (action.type) {
    case fromSlides.LOAD_SUCCESS: {
      return slidesAdapter.addAll(action.payload.slides, state);
    }
    default: {
      return state;
    }
  }
}
