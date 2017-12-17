import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material';
import { SharedModule } from '@labdat/shared';
import { AuthenticationModule } from '@labdat/authentication/authentication.module';
import { CoreModule } from '@labdat/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoreStateModule } from '@labdat/core-state';
import { AuthenticationStateModule } from '@labdat/authentication-state';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers } from './+state/app.reducer';
import { coreConfiguration } from '@labdat/core';
import { slidesConfiguration } from '@labdat/slides';
import { environment } from '../environments/environment';
import { RouterStateModule } from '@labdat/router-state';

@NgModule({
  imports: [
    NxModule.forRoot(),
//    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    MatIconModule,

    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    RouterModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    SharedModule.forRoot(),
    AuthenticationModule.forRoot(),
    CoreModule.forRoot(),

    RouterStateModule.forRoot(),
    AuthenticationStateModule.forRoot(),
    CoreStateModule.forRoot([
      ...coreConfiguration.self,
      ...slidesConfiguration.core
    ])
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
