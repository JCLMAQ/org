import { Update } from '@ngrx/entity';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Taskentity } from './taskentity.model';

export const TaskentityActions = createActionGroup({
  source: 'Taskentity/API',
  events: {
    'Load Taskentities': props<{ taskentities: Taskentity[] }>(),
    'Add Taskentity': props<{ taskentity: Taskentity }>(),
    'Upsert Taskentity': props<{ taskentity: Taskentity }>(),
    'Add Taskentities': props<{ taskentities: Taskentity[] }>(),
    'Upsert Taskentities': props<{ taskentities: Taskentity[] }>(),
    'Update Taskentity': props<{ taskentity: Update<Taskentity> }>(),
    'Update Taskentities': props<{ taskentities: Update<Taskentity>[] }>(),
    'Delete Taskentity': props<{ id: string }>(),
    'Delete Taskentities': props<{ ids: string[] }>(),
    'Clear Taskentities': emptyProps(),
  }
});
