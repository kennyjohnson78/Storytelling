import { Slides } from './slides.interfaces';
import * as fromSlides from './slides.actions';

export function slidesReducer(state: Slides, action: fromSlides.Actions): Slides {
  switch (action.type) {
    case fromSlides.LOAD_SUCCESS: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
}
