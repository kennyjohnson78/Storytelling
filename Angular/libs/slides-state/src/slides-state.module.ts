import { NgModule, APP_INITIALIZER, ModuleWithProviders, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SlidesApiService } from './services/slides.api.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { slidesReducer } from './+state/slides.reducer';
import { slidesInitialState } from './+state/slides.init';
import { SlidesEffects } from './+state/slides.effects';
import { SlidesInitializationService } from './services/slides.initialization.service';


export function slidesInitialisationFactory(slidesInitialization) {
  return () => slidesInitialization.loadSlides() ;
}

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('slides', slidesReducer),
    EffectsModule.forFeature([ SlidesEffects ])
  ],
})
export class SlidesStateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SlidesStateModule,
      providers: [
        SlidesApiService,
        SlidesInitializationService,
        {
          provide: APP_INITIALIZER,
          useFactory: slidesInitialisationFactory,
          deps: [SlidesInitializationService],
          multi: true
        }]
    };
  }
}
