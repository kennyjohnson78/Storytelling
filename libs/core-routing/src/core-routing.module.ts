import {
  HomeComponent,
  LayoutComponent,
  NotFoundComponent } from '@labdat/core/core-components';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreGuardService } from './services/core.guard.service';
import { AuthenticationGuardService } from '@labdat/authentication';
import { AuthenticationComponent } from '@labdat/authentication';

const coreRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'auth',
        component: AuthenticationComponent,
        canActivate: [AuthenticationGuardService]
      },
      {
        path: 'slides',
        canActivate: [AuthenticationGuardService],
        canLoad: [AuthenticationGuardService],
        loadChildren: '../../slides/src/slides.module#SlidesModule'
      },
      {
        path: '**',
        component: NotFoundComponent,
        data: {
          title: 'Not-Found'
        }
      }
    ]
  }
];
//  { path: 'forbiden', component: ForbidenComponent, data: { title: 'Forbiden'} },

@NgModule({
  imports: [RouterModule.forRoot(coreRoutes)],
  providers: [CoreGuardService]
})
export class CoreRoutingModule {}
