import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreRoutingModule } from 'app/core/+routing/core-routing.module';
import { AuthenticationModule } from 'app/authentication/authentication.module';
import { Store, StoreModule } from '@ngrx/store';
import {
  MatButtonModule,
  MatTooltipModule,
  MatToolbarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatListModule
 } from '@angular/material';
 import { SharedModule } from 'app/shared/shared.module';

export const COMPONENTS = [
  LayoutComponent,
  HomeComponent,
  NotFoundComponent
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatTooltipModule,
  MatToolbarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatListModule
 ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AuthenticationModule,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootCoreModule,
    }
  }
}

@NgModule({
  imports: [
    CoreModule,
    CoreRoutingModule
  ]
})
export class RootCoreModule { }
