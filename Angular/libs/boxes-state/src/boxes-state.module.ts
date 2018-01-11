import { NgModule, APP_INITIALIZER, ModuleWithProviders, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BoxesApiService } from './services/boxes.api.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { boxesReducer } from './+state/boxes.reducer';
import { boxesInitialState } from './+state/boxes.init';
import { BoxesEffects } from './+state/boxes.effects';
import { BoxesInitializationService } from './services/boxes.initialization.service';

export function boxesInitialisationFactory(boxesInitialization) {
  return () => boxesInitialization.loadBoxes() ;
}

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('boxes', boxesReducer),
    EffectsModule.forFeature([ BoxesEffects ])
  ],
})
export class BoxesStateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: BoxesStateModule,
      providers: [
        BoxesApiService,
        BoxesInitializationService,
        {
          provide: APP_INITIALIZER,
          useFactory: boxesInitialisationFactory,
          deps: [BoxesInitializationService],
          multi: true
        }]
    };
  }
}
