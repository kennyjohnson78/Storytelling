import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PresentationsState, presentationsAdapter } from './presentations.interfaces';
import * as fromPresentations from './presentations.actions';
import { isEmpty } from 'lodash';

const selectPresentationsState = createFeatureSelector<PresentationsState>('presentations');

export const {
  selectIds: selectPresentationsIds,
  selectEntities: selectPresentationsEntities,
  selectAll: selectAllPresentationss,
  selectTotal: selectPresentationsTotal,
} = presentationsAdapter.getSelectors(selectPresentationsState);

export const selectIsLoading = (state: PresentationsState) => state.loading;
export const selectIsLoaded = (state: PresentationsState) => state.loaded;
