import { SlidesState, slidesAdapter } from './slides.interfaces';
import { Slide } from '@labdat/data-models';


export const slidesInitialState: SlidesState = slidesAdapter.getInitialState({
  loaded: false,
  loading: false
});
