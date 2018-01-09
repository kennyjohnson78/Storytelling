import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Slide } from '@labdat/data-models';

export interface SlidesState extends EntityState<Slide> {
  loaded: boolean;
  loading: boolean;
}
export const slidesAdapter: EntityAdapter<Slide> = createEntityAdapter<Slide>();
