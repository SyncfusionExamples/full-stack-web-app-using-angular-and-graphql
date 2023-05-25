import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { AppRoutingModule } from './app-routing.module';
import { Ej2ComponentsModule } from './ej2-components/ej2-components.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieFilterComponent } from './components/movie-filter/movie-filter.component';
import { MovieSortComponent } from './components/movie-sort/movie-sort.component';
import { LoginComponent } from './components/login/login.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { MovieRatingComponent } from './components/movie-rating/movie-rating.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    MovieCardComponent,
    MovieDetailsComponent,
    MovieFilterComponent,
    MovieSortComponent,
    LoginComponent,
    UserRegistrationComponent,
    MovieRatingComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    GraphQLModule,
    Ej2ComponentsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
