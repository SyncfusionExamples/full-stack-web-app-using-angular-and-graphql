import { NgModule } from '@angular/core';
import { MovieFormComponent } from '../components/movie-form/movie-form.component';
import { ManageMoviesComponent } from '../components/manage-movies/manage-movies.component';
import { RouterModule, Routes } from '@angular/router';

const adminRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'new', component: MovieFormComponent },
      { path: ':movieId', component: MovieFormComponent },
      { path: '', component: ManageMoviesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
