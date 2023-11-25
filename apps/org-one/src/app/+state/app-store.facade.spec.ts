import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as AppStoreActions from './app-store.actions';
import { AppStoreEffects } from './app-store.effects';
import { AppStoreFacade } from './app-store.facade';
import { AppStoreEntity } from './app-store.models';
import {
  APP_STORE_FEATURE_KEY,
  AppStoreState,
  initialAppStoreState,
  appStoreReducer,
} from './app-store.reducer';
import * as AppStoreSelectors from './app-store.selectors';

interface TestSchema {
  appStore: AppStoreState;
}

describe('AppStoreFacade', () => {
  let facade: AppStoreFacade;
  let store: Store<TestSchema>;
  const createAppStoreEntity = (id: string, name = ''): AppStoreEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(APP_STORE_FEATURE_KEY, appStoreReducer),
          EffectsModule.forFeature([AppStoreEffects]),
        ],
        providers: [AppStoreFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(AppStoreFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allAppStore$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allAppStore$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadAppStoreSuccess` to manually update list
     */
    it('allAppStore$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allAppStore$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        AppStoreActions.loadAppStoreSuccess({
          appStore: [createAppStoreEntity('AAA'), createAppStoreEntity('BBB')],
        })
      );

      list = await readFirst(facade.allAppStore$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
