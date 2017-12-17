import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreRoutingModule } from '@labdat/core-routing';
import { AuthenticationModule } from '@labdat/authentication';
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
import { SharedModule } from '@labdat/shared';

export const COMPONENTS = [LayoutComponent, HomeComponent, NotFoundComponent];

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
    FlexLayoutModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootCoreModule
    };
  }
}

@NgModule({
  imports: [
    CoreModule,
    CoreRoutingModule
  ]
})
export class RootCoreModule {}
