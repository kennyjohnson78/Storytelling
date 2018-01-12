import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SlidesState, slidesAdapter } from './slides.interfaces';
import * as fromSlides from './slides.actions';
import { isEmpty } from 'lodash';
import { Slides } from '@labdat/data-models';

const selectSlidesState = createFeatureSelector<SlidesState>('slides');

export const {
  selectIds: selectSlidesIds,
  selectEntities: selectSlidesEntities,
  selectAll: selectAllSlidess,
  selectTotal: selectSlidesTotal,
} = slidesAdapter.getSelectors(selectSlidesState);

export const selectIsLoading = (state: SlidesState) => state.loading;
export const selectIsLoaded = (state: SlidesState) => state.loaded;
