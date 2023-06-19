import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { ManageMoviesComponent } from './components/manage-movies/manage-movies.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminEj2ComponentsModule } from './admin-ej2-components/admin-ej2-components.module';

@NgModule({
  declarations: [MovieFormComponent, ManageMoviesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    AdminEj2ComponentsModule,
  ],
})
export class AdminModule {}
