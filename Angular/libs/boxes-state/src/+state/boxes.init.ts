import { BoxesState, boxesAdapter } from './boxes.interfaces';

export const boxesInitialState: BoxesState = boxesAdapter.getInitialState({
  loaded: false,
  loading: false
});
