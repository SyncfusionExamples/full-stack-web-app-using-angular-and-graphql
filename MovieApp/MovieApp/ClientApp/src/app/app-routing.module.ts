import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { adminAuthGuard } from './guards/admin-auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'filter', title: 'home page', component: HomeComponent },
  { path: 'search', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'movies/details/:movieId', component: MovieDetailsComponent },
  {
    path: 'admin/movies',
    loadChildren: () =>
      import('./admin/admin.module').then((module) => module.AdminModule),
    canLoad: [adminAuthGuard],
    canActivate: [adminAuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
