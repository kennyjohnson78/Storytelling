import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Presentation } from '@labdat/data-models';

export interface PresentationsState extends EntityState<Presentation> {
  loaded: boolean;
  loading: boolean;
}
export const presentationsAdapter: EntityAdapter<Presentation> = createEntityAdapter<Presentation>();
