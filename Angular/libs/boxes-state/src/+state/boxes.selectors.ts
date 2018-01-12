import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BoxesState, boxesAdapter } from './boxes.interfaces';
import * as fromBoxes from './boxes.actions';
import { isEmpty } from 'lodash';

const selectBoxesState = createFeatureSelector<BoxesState>('boxes');

export const {
  selectIds: selectBoxesIds,
  selectEntities: selectBoxesEntities,
  selectAll: selectAllBoxess,
  selectTotal: selectBoxesTotal,
} = boxesAdapter.getSelectors(selectBoxesState);

export const selectIsLoading = (state: BoxesState) => state.loading;
export const selectIsLoaded = (state: BoxesState) => state.loaded;
