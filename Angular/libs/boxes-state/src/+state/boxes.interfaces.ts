import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Box } from '@labdat/data-models';

export interface BoxesState extends EntityState<Box> {
  loaded: boolean;
  loading: boolean;
}
export const boxesAdapter: EntityAdapter<Box> = createEntityAdapter<Box>();
