import { NgModule, APP_INITIALIZER, ModuleWithProviders, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PresentationsApiService } from './services/presentations.api.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { presentationsReducer } from './+state/presentations.reducer';
import { presentationsInitialState } from './+state/presentations.init';
import { PresentationsEffects } from './+state/presentations.effects';
import { PresentationsInitializationService } from './services/presentations.initialization.service';

export function presentationsInitialisationFactory(presentationsInitialization) {
  return () => presentationsInitialization.loadPresentations() ;
}

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('presentations', presentationsReducer),
    EffectsModule.forFeature([ PresentationsEffects ])
  ],
})
export class PresentationsStateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: PresentationsStateModule,
      providers: [
        PresentationsApiService,
        PresentationsInitializationService,
        {
          provide: APP_INITIALIZER,
          useFactory: presentationsInitialisationFactory,
          deps: [PresentationsInitializationService],
          multi: true
        }]
    };
  }
}
