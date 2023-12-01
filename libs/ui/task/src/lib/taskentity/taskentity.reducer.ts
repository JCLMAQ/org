import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { TaskentityActions } from './taskentity.actions';
import { Taskentity } from './taskentity.model';

export const taskentitiesFeatureKey = 'taskentities';

export interface State extends EntityState<Taskentity> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Taskentity> = createEntityAdapter<Taskentity>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(TaskentityActions.addTaskentity,
    (state, action) => adapter.addOne(action.taskentity, state)
  ),
  on(TaskentityActions.upsertTaskentity,
    (state, action) => adapter.upsertOne(action.taskentity, state)
  ),
  on(TaskentityActions.addTaskentities,
    (state, action) => adapter.addMany(action.taskentities, state)
  ),
  on(TaskentityActions.upsertTaskentities,
    (state, action) => adapter.upsertMany(action.taskentities, state)
  ),
  on(TaskentityActions.updateTaskentity,
    (state, action) => adapter.updateOne(action.taskentity, state)
  ),
  on(TaskentityActions.updateTaskentities,
    (state, action) => adapter.updateMany(action.taskentities, state)
  ),
  on(TaskentityActions.deleteTaskentity,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(TaskentityActions.deleteTaskentities,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(TaskentityActions.loadTaskentities,
    (state, action) => adapter.setAll(action.taskentities, state)
  ),
  on(TaskentityActions.clearTaskentities,
    state => adapter.removeAll(state)
  ),
);

export const taskentitiesFeature = createFeature({
  name: taskentitiesFeatureKey,
  reducer,
  extraSelectors: ({ selectTaskentitiesState }) => ({
    ...adapter.getSelectors(selectTaskentitiesState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = taskentitiesFeature;
