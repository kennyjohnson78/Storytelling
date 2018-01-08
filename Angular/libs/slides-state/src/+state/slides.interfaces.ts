import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Slide } from '@labdat/data-models';

export interface Slide {
  // define state here
}

export interface SlidesState extends EntityState<Slide> { }
export const commandAdapter: EntityAdapter<Slide> = createEntityAdapter<Slide>();
